import {PRICE, CITIES, TRANSFER, ACTIVITY, OFFERSAVAILABLE} from "../const";
import {getRandomInteger, shuffle, getRandomBoolean} from "../util";

const Count = {
  MIN: 1,
  MAX: 5,
};

/* Переменные, которые отвечают за генерацию дат*/
const startDay = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // Пусть начало путешествия будет всегда через 5 дней (Date.now() - возвращает кол-во миллисек. текущей даты)
const startDayTimestamp = startDay.getTime(); // предполагаемое время начала путешествия (getTime() возвращает числовое значение указанной даты в виде количества миллисекунд, прошедших с 00:00:00 1 января 1970 года по UTC)
const maxDurationDays = 6; // максимальное количество дней продолжительности путешествия
const maxDurationMilliseconds = maxDurationDays * 24 * 60 * 60 * 1000; // продолжительность путешествия в миллисек.
const endDayTimestamp = getRandomInteger(startDayTimestamp, startDayTimestamp + maxDurationMilliseconds); // получили предполагаемое время окончания путешествия в миллисек.
let tempStartPoint = startDayTimestamp; // к этой переменной будет доступ только у функции генерации dateTo
/* Конец этих переменных */

const generateCityName = () => {
  return CITIES[getRandomInteger(0, CITIES.length - 1)];
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getPictureSrc = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getRandomPrice = () => PRICE[getRandomInteger(0, PRICE.length - 1)];

/* Отдельная функция, чтобы генерировались офферы */
const getRandomOffers = (count) => shuffle(OFFERSAVAILABLE.slice()).slice(0, count);
/* Конец отдельной функции */

/* Сделаем отдельную функцию для генерации массива временных точек, чтобы они красивенько располагались друг за другом */
const getPointDateTo = () => {
  const tempEndPoint = getRandomInteger(tempStartPoint, Math.floor(tempStartPoint + (endDayTimestamp - tempStartPoint) / 2)); // вычислили время окончания точки

  tempStartPoint = tempEndPoint + 30 * 60 * 1000; // переназначили время старта для следующей генерации

  return tempEndPoint;
};
/* Конец красивенькой функции */

/*
  Вот здесь одно из самых важных изменений: мы экспортируем не функцию создания конкретной точки, а именно функцию отдающую массив со сгенерированными точками.
  Сделано это как раз для манипуляций с датами:) Так как это данные моковые, никуда наружу этот метод в любом случае смотреть не будет, а main.js мы просто получаем готовый массивчик,
  как, собственно и будет далее:)
 */

const generatePointOfRoute = () => {
  const types = TRANSFER.concat(ACTIVITY);
  const type = types[getRandomInteger(0, types.length - 1)];
  /* Получаем отображаемое название типа точки - просто приводим первую букву к верхнему регистру */
  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
  /* Чистая фантазия - просто рандомно определяем сколько офферов мы хотим, в зависимости от того, какой тип у точки */
  const offersCount = (TRANSFER.indexOf(type) > -1) ? getRandomInteger(0, OFFERSAVAILABLE.length - 1) : getRandomInteger(0, Math.floor(OFFERSAVAILABLE.length / 2) - 1);
  /* Конец фантазии:) */

  const sentence = shuffle(text.split(`. `).slice());
  const description = sentence.slice(0, getRandomInteger(1, sentence.length)).join(`. `);

  const pictures = new Array(getRandomInteger(Count.MIN, Count.MAX)).fill().map(getPictureSrc);

  const dateFrom = new Date(tempStartPoint);
  const dateTo = new Date(getPointDateTo()); // здесь мы получаем дату окончания и одновременно обновляем переменную с датой начала следующего промежутка


  return {
    type,
    typeTitle,
    cityName: generateCityName(),
    additionalOptions: getRandomOffers(offersCount),
    infoDestination: {
      description,
      pictures,
    },
    price: getRandomPrice(),
    dateFrom,
    dateTo,
    isFavorite: getRandomBoolean(),
  };
};

export const generatePointsArray = (count) => {
  return new Array(count).fill().map(generatePointOfRoute);
};


