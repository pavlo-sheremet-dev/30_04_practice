import { ThemeProvider } from 'styled-components';
import { HeaderStyled } from './Header/Header.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeTitle } from 'redux/global/selectors';
import { toggleThemeTitle } from 'redux/global/globalSlice';
import { theme, colorTheme } from 'styles/theme';
import { GlobalStyles } from 'styles/GlobalStyles';
import { useEffect } from 'react';
import {
  addArticle,
  deleteArticle,
  fetchArticles,
  putArticle,
} from 'redux/articles/operations';
import { selectArticles, selectEditingItem } from 'redux/articles/selectors';
import { toggleEditItem } from 'redux/articles/articlesSlice';

export const App = () => {
  const themeTitle = useSelector(selectThemeTitle);
  const articles = useSelector(selectArticles);
  const editingItem = useSelector(selectEditingItem);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeTitle('some payload'));
  };

  useEffect(() => {
    dispatch(fetchArticles('some payload for fetchArticles operations'));
  }, [dispatch]);

  const normalizedTheme = { ...theme, ...colorTheme[themeTitle] };

  const handleSubmit = e => {
    e.preventDefault();
    const { title, description, text } = e.target;
    const newArticleData = {
      title: title.value,
      description: description.value,
      text: text.value,
    };

    dispatch(addArticle(newArticleData));

    e.target.reset();
  };

  const handleDelete = id => {
    dispatch(deleteArticle(id));
  };

  const handleEditItem = handleEditItem => {
    dispatch(toggleEditItem(handleEditItem));
  };
  const updateArticle = e => {
    e.preventDefault();
    const { title, description, text } = e.target;
    const newArticleData = {
      id: editingItem.id,
      title: title.value,
      description: description.value,
      text: text.value,
    };

    dispatch(putArticle(newArticleData));

    e.target.reset();
  };

  const cancelUpdate = () => {
    dispatch(toggleEditItem(null));
  };

  return (
    <ThemeProvider theme={normalizedTheme}>
      <GlobalStyles />
      <HeaderStyled>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>LOGO</div>
          <div>
            <button type="button" onClick={toggleTheme}>
              {themeTitle}
            </button>
          </div>
        </div>
      </HeaderStyled>
      <main>
        <section>
          <h1>Title</h1>
          {editingItem ? (
            <>
              <p>EDIT FORM</p>
              <form onSubmit={updateArticle} key={'edit-form'}>
                <label>
                  title
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingItem.title}
                  />
                </label>
                <br />
                <label>
                  description
                  <textarea
                    name="description"
                    defaultValue={editingItem.description}
                  />
                </label>
                <br />
                <label>
                  text
                  <textarea name="text" defaultValue={editingItem.text} />
                </label>
                <button type="submit">SAVE CHANGES</button>
                <button type="type" onClick={cancelUpdate}>
                  CANCEL
                </button>
              </form>
            </>
          ) : (
            <>
              <p>ADD FORM</p>
              <form onSubmit={handleSubmit} key={'add-form'}>
                <label>
                  title
                  <input type="text" name="title" />
                </label>
                <br />
                <label>
                  description
                  <textarea name="description" />
                </label>
                <br />
                <label>
                  text
                  <textarea name="text" />
                </label>
                <button type="submit">ADD ARTICLE</button>
              </form>
            </>
          )}

          <ul>
            {articles.map(article => (
              <li key={article.id}>
                <button type="button" onClick={() => handleDelete(article.id)}>
                  DELETE
                </button>
                <button type="button" onClick={() => handleEditItem(article)}>
                  EDIT
                </button>
                <h2>{article.title}</h2>

                <p>{article.description}</p>

                <p>{article.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </ThemeProvider>
  );
};
