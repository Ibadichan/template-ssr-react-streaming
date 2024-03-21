import { useEffect } from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import zh from 'date-fns/locale/zh-CN';
import de from 'date-fns/locale/de';

const locales = {
  ru,
  zh,
  de,
};

function useDatepickerLocales() {
  const lang = 'zh';

  useEffect(() => {
    // English locale does not exist in date-fns
    if (lang !== 'en') {
      registerLocale(lang, locales[lang]);
      setDefaultLocale(lang);
    }
  }, [lang]);
}

export default useDatepickerLocales;
