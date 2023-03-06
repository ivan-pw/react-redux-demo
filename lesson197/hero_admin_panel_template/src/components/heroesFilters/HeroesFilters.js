import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';

import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );

  const filters = selectAll(store.getState());
  // console.log(filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return arr.map(({ name, className, label }) => {
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button
          className={btnClass}
          key={name}
          id={name}
          onClick={() => dispatch(filtersChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {/* <button className="btn btn-outline-dark active">Все</button>
          <button className="btn btn-danger">Огонь</button>
          <button className="btn btn-primary">Вода</button>
          <button className="btn btn-success">Ветер</button>
          <button className="btn btn-secondary">Земля</button> */}
          {elements}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
