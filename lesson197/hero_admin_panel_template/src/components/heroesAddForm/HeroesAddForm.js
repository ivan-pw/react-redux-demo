import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import store from '../../store';
import { heroCreated } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filtersSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  const [heroElem, setHeroElem] = useState('');

  const dispatch = useDispatch();

  const { request } = useHttp();

  const filtersLoadingStatus = useSelector((state) => state.filters);

  const filters = selectAll(store.getState());

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDesc,
      element: heroElem,
    };

    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
      .then((res) => console.log('Sended'))
      .then(dispatch(heroCreated(newHero)))
      .catch((err) => console.log(err));

    setHeroName('');
    setHeroDesc('');
    setHeroElem('');
  };

  const renderFilterOptions = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрузка...</option>;
    } else if (status === 'error') {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          value={heroDesc}
          onChange={(e) => setHeroDesc(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          value={heroElem}
          onChange={(e) => setHeroElem(e.target.value)}
          className="form-select"
          id="element"
          name="element"
        >
          <option>Я владею элементом...</option>
          {/* <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option> */}
          {renderFilterOptions(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
