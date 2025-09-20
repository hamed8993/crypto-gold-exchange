// eslint-disable-next-line
const fs = require("fs");
// eslint-disable-next-line
const path = require("path");
// eslint-disable-next-line
const axios = require("axios");

function getFoldersRecursive(filePath) {
  const paths = [];

  function shouldIgnoreFolder(folderName) {
    const ignoredPrefixes = ["[", "(", "_", "-"];
    return ignoredPrefixes.some((prefix) => folderName.startsWith(prefix));
  }

  function traverse(currentPath) {
    const files = fs.readdirSync(currentPath, { withFileTypes: true });
    files.forEach((file) => {
      if (file.isDirectory()) {
        const folderName = file.name;
        if (!shouldIgnoreFolder(folderName)) {
          paths.push(path.join(currentPath, folderName));
          traverse(path.join(currentPath, folderName));
        }
      }
    });
  }

  traverse(filePath);
  return paths;
}

const targetPath = `src/app/[locale]`;

const allPaths = getFoldersRecursive(targetPath);

const allSplittedPaths = allPaths.map((item) => item.split("/"));

const enFolderNames = [];
const faFolderNames = [];
const enPathNames = [];
const faPathNames = [];

allSplittedPaths.map((item) => {
  if (item.length === 4) {
    enFolderNames.push(`${process.env.NEXT_PUBLIC_BASE_URL}/en/${item[3]}`);
    faFolderNames.push(`${process.env.NEXT_PUBLIC_BASE_URL}/fa/${item[3]}`);
    enPathNames.push(`/en/${item[3]}`);
    faPathNames.push(`/fa/${item[3]}`);
  } else if (item.length > 4) {
    for (let i = 4; i < item.length; i++) {
      let add = "";
      const slicedItems = item.splice(0, 4);
      item.map((item) => {
        add += `/${item}`;
      });
      enFolderNames.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/en/${slicedItems[3]}` + `${add}`,
      );
      faFolderNames.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/fa/${slicedItems[3]}` + `${add}`,
      );
      enPathNames.push(`/en/${slicedItems[3]}` + `${add}`);
      faPathNames.push(`/fa/${slicedItems[3]}` + `${add}`);
    }
  }
});

const makeUrlObjects = (folder) => {
  return folder.map((item) => {
    return { url: item };
  });
};

const createJson = (base, quote, coin, lng, afterLng) => {
  if (afterLng === "trade") {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/${afterLng}/${base}-${quote}`,
    };
  }
};

const getExchange_dataMarketsKey = `${process.env.NEXT_PUBLIC_API_URL}/exchange_data/markets`;

async function getAllMarkets(lng) {
  try {
    const response = await axios.get(getExchange_dataMarketsKey);
    const markets = response.data.result;

    const urls = markets.map((market) => {
      return createJson(market.base, market.quote, "", lng, "trade");
    });

    return urls;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
}

async function sitemap() {
  const getStatics = (lng) => {
    const folder =
      lng === "fa" ? faFolderNames : lng === "en" ? enFolderNames : null;
    return makeUrlObjects(folder)
      ?.filter(
        (item) =>
          item?.url !== `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/trade` &&
          item?.url !==
            `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/authentication`,
      )
      .concat([
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}`,
        },
      ]);
  };

  const enStatics = await getStatics("en");
  const faStatics = await getStatics("fa");
  const enMarketsData = await getAllMarkets("en");
  const faMarketsData = await getAllMarkets("fa");

  const getPrivatePages = (lng) => {
    const folder =
      lng === "fa" ? faPathNames : lng === "en" ? enPathNames : null;
    return makeUrlObjects(folder)
      ?.filter(
        (item) =>
          item?.url !== `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/trade` &&
          item?.url !==
            `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}/authentication`,
      )
      .concat([
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}`,
        },
      ]);
  };
  const privatePagesEn = getPrivatePages("en").filter((item1) => {
    return !enStatics.some((item2) => {
      return (
        item2.url === `${process.env.NEXT_PUBLIC_BASE_URL}${item1.url}` ||
        item1.url.endsWith("/en")
      );
    });
  });
  const privatePagesFa = getPrivatePages("fa").filter((item1) => {
    return !faStatics.some((item2) => {
      return (
        item2.url === `${process.env.NEXT_PUBLIC_BASE_URL}${item1.url}` ||
        item1.url.endsWith("/fa")
      );
    });
  });
  const allPrivatePages = privatePagesEn.concat(privatePagesFa);

  const readyParametersObject = (category, lng) => {
    const getPriority = (item) => {
      return item?.url === `${process.env.NEXT_PUBLIC_BASE_URL}/${lng}`
        ? 1
        : item?.url?.includes(`/${lng}/trade/`)
          ? 0.8
          : 0.7;
    };
    return category?.map((item) => {
      return {
        url: `${item?.url}`,
        changeFrequency: "daily",
        priority: getPriority(item),
        lastmod: process.env.NEXT_PUBLIC_BUILDTIME,
      };
    });
  };

  const enStatic_array_ready = readyParametersObject(enStatics, "en");
  const faStatic_array_ready = readyParametersObject(faStatics, "fa");
  const enMarkets_array_ready = readyParametersObject(enMarketsData, "en");
  const faMarkets_array_ready = readyParametersObject(faMarketsData, "fa");

  const reduceItemForRobots = (readyArray) => {
    return readyArray?.reduce((total, item) => {
      total += `Disallow: ${
        item?.url.endsWith("/trade") || item?.url.endsWith("/authentication")
          ? item?.url + "$"
          : item.url
      }\n`;
      return total;
    }, "");
  };

  /*
  *********************************************************************
    SECTION BELOW IS NEEDED TO ADD REAL ROBOTS.TXT FILE IN PRODUCTION
  *********************************************************************
  */

  //   const robotsReady =
  //     `# *\nUser-agent: *\nAllow: /\nAllow: /blog/\nAllow: /blog/wp-content/uploads/\n` +
  //     reduceItemForRobots(allPrivatePages) +
  //     `Disallow: /en/welcome\nDisallow: /fa/welcome\nDisallow: /en/kyc-landing\nDisallow: /fa/kyc-landing\nDisallow: /en/landing-yk-start\nDisallow: /fa/landing-yk-start\nDisallow: /en/migration\nDisallow: /en/landing-six\nDisallow: /fa/migration\nDisallow: /fa/landing-six\nDisallow: /fa/return/\nDisallow: /fa/mobile-identification/\nDisallow: /en/mobile-identification/\nDisallow: /_next/static/chunks/\nDisallow: /_next/static/css/\nDisallow: /_next/static/media/\n\n# Blog\nDisallow: /blog/wp-admin/\nDisallow: /blog/wp-includes/\nDisallow: /blog/wp-login.php\nDisallow: /blog/wp-register.php\nDisallow: /blog/comments.php\nDisallow: /blog/trackback/\nDisallow: /blog/search/\nDisallow: /blog/?s\n\n# Help\nDisallow: /help/wp-admin/\nDisallow: /help/wp-includes/\nDisallow: /help/wp-login.php\nDisallow: /help/wp-register.php\nDisallow: /help/comments.php\nDisallow: /help/trackback/\nDisallow: /help/search/\nDisallow: /help/tag/\nDisallow: /help/?s\n\n# Sitemaps\nsitemap: ${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml\n`;

  /*
  ***********************************************
    SECTION BELOW IS FOR DEVELOPMENT DEPLOYMENT
  ***********************************************
  */
  const robotsReady = `# *\nUser-agent: *\nDisallow: /\n`;

  const reduceItem = (readyArray) => {
    return readyArray?.reduce((total, item) => {
      total += `<url><loc>${item?.url}</loc><changefreq>${item?.changeFrequency}</changefreq><priority>${item?.priority}</priority><lastmod>${item?.lastmod}</lastmod></url>`;
      return total;
    }, "");
  };

  const enStaticReadyTags = reduceItem(enStatic_array_ready);
  const enMarketReadyTags = reduceItem(enMarkets_array_ready);
  const faStaticReadyTags = reduceItem(faStatic_array_ready);
  const faMarketReadyTags = reduceItem(faMarkets_array_ready);

  const categoryTags = [
    `<sitemap><loc>${process.env.NEXT_PUBLIC_BASE_URL}/en_sitemap.xml</loc></sitemap><sitemap><loc>${process.env.NEXT_PUBLIC_BASE_URL}/fa_sitemap.xml</loc></sitemap>`,
  ];

  const tags = [{ name: "sitemap.xml", tags: categoryTags }];

  const levelTwoTags = [
    {
      name: "en_sitemap.xml",
      tags: enStaticReadyTags + enMarketReadyTags,
    },
    {
      name: "fa_sitemap.xml",
      tags: faStaticReadyTags + faMarketReadyTags,
    },
  ];

  const wrapSitemap = (tags) => {
    return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${tags}</sitemapindex>`;
  };

  const wrapSecondSitemap = (tags) => {
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${tags}</urlset>`;
  };

  tags.map((item) => {
    fs.writeFile(
      `./public/${item?.name}`,
      wrapSitemap(item?.tags),
      function () {
        return null;
      },
    );
  });

  levelTwoTags.map((item) => {
    fs.writeFile(
      `./public/${item?.name}`,
      wrapSecondSitemap(item?.tags),
      function () {
        return null;
      },
    );
  });

  fs.writeFile(`./public/robots.txt`, robotsReady, function () {
    return null;
  });
}

sitemap();
