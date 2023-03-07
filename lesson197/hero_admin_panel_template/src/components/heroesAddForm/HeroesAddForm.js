import { useSelector } from 'react-redux';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import store from '../../store';
import { selectAll } from '../heroesFilters/filtersSlice';

import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  const [heroElem, setHeroElem] = useState('');

  const [createHero] = useCreateHeroMutation();

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

    createHero(newHero).unwrap();

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
