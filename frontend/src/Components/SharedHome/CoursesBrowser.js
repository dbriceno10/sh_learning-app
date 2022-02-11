import React, { useEffect, useState } from 'react';
import SearchModificado from './SearchModificado';
import Filterings from '../Filtering/Filterings'
import Cards from '../Cards/Cards';
import './SearchModificado.css';
import './CoursesBrowser.css';
import Sorting from '../Sorting/Sorting';

function CoursesBrowser() {
  const [renderizado, setrenderizado] = useState({
    name: '',
    category: '',
    order: ''
  });
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className='courses-browser'>
      <header className='courses-browser_header title'>
        <h1>Explora entre muchos cursos disponibles</h1>
      </header>
      <section className='courses-browser_top-panel'>
        <SearchModificado
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        >
        </SearchModificado>
        <Sorting setrenderizado={setrenderizado} renderizado={renderizado} />
      </section>
      <aside className='courses-browser_filter-controls'>
        <Filterings />
      </aside>
      <section className='courses-browser_course-gallery'>
        <Cards searchTerm={searchTerm} />
      </section>
    </section>
  );
}

export default CoursesBrowser;
