import moment from "moment-jalaali";
import originalMoment from "moment";
import { useCallback } from "react";
import useUrl from "@/core/hooks/useUrl";

function useConvertMillisecondToLocal() {
  const { locale } = useUrl();
  const isFa = locale === "fa";

  const convertMillisecondToLocal = useCallback(
    (
      time?: string | number,
    ): {
      date?: string;
      time?: string;
      dateTime?: string;
      month?: string;
      day?: string;
      year?: string;
      human?: string;
      humanDate?: string;
      hoursAndMinutes?: string;
    } => {
      if (!time) {
        return {};
      }
      if (time === 0 || time === "0") {
        return {};
      }

      const _time = Number(time);

      if (!/^\d+$/.test(`${time}`) && _time > 0 && !isNaN(_time)) {
        return {};
      }

      if (isNaN(_time)) {
        return {};
      }

      const m = moment(_time);

      return {
        get dateTime() {
          return m.format(isFa ? "jYYYY/jMM/jDD HH:mm" : "YYYY/MM/DD HH:mm");
        },
        get date() {
          return m.format(isFa ? "jYYYY/jMM/jDD" : "YYYY/MM/DD");
        },
        get time() {
          return m.format("HH:mm:ss");
        },
        get month() {
          return m.format(isFa ? "jMMMM" : "MMMM");
        },
        get day() {
          return m.format(isFa ? "jDD" : "DD");
        },
        get year() {
          return m.format(isFa ? "jYYYY" : "YYYY");
        },
        get humanDate() {
          return m.format(isFa ? "jYYYY jMMMM jDD" : "YYYY MMMM DD");
        },
        get human() {
          const mom = isFa ? moment : originalMoment;
          return mom
            .duration(
              m.toDate().getTime() - moment().toDate().getTime(),
              "milliseconds",
            )
            .humanize(true);
        },
        get hoursAndMinutes() {
          return m.format("HH:mm");
        },
      };
    },
    [isFa],
  );

  const convertToDayEnd = (timestamp: Date) => {
    timestamp.setHours(23, 59, 59, 999);

    const endOfDay = timestamp.getTime().toString();

    return endOfDay;
  };

  return { convertMillisecondToLocal, convertToDayEnd };
}

export { useConvertMillisecondToLocal };
