import { utils as XLSXUtils, writeFile as XLSXWriteFile } from "xlsx";

interface CreateExcelProps<Tdata extends object> {
  excelName: string;
  excelData: Tdata[];
  meta?: Array<{
    key: keyof Tdata;
    header?: string;
    renderValue?: (value: Tdata) => string;
  }>;
}

const pick = (
  obj: Record<string, unknown>,
  arrayOfKeys: string[],
): Record<string, unknown> => {
  return arrayOfKeys.reduce((res, key) => ({ ...res, [key]: obj[key] }), {});
};

export const createExcel = <Tdata extends Record<string, unknown>>({
  excelData,
  excelName,
  meta,
}: CreateExcelProps<Tdata>) => {
  // Get the keys inside the meta
  const keysToUse = meta?.map((item) => item.key);

  // Separate Data base on the selected keys
  const pickedData =
    !keysToUse || keysToUse.length === 0
      ? excelData
      : (excelData.map((item) => {
          return pick(item, keysToUse as string[]);
        }) as Tdata[]);

  // Consider renderValue on each value if it exists
  const getModifiedData = (): Tdata[] => {
    if (!meta) {
      return pickedData;
    }

    return pickedData.map((data) => {
      const mappedData: Tdata = {} as Tdata;

      meta.forEach(({ key, renderValue }) => {
        if (renderValue) {
          // If renderValue function exists, use it to transform the value
          // @ts-ignore
          mappedData[key] = renderValue(data);
        } else {
          // Otherwise, use the original value
          mappedData[key] = data[key];
        }
      });

      return mappedData;
    });
  };

  const worksheet = XLSXUtils.json_to_sheet(getModifiedData());

  Object.keys(worksheet).forEach((cell) => {
    if (!cell.startsWith("!")) {
      // Skip metadata keys
      worksheet[cell].z = "@"; // '@' enforces text format in Excel
    }
  });

  // Add custom headers if they exist
  const columnHeaders = meta?.map((item) => item.header);
  if (columnHeaders && columnHeaders.length > 0) {
    XLSXUtils.sheet_add_aoa(worksheet, [columnHeaders], { origin: "A1" });
  }

  const workbook = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSXWriteFile(workbook, excelName);
};
