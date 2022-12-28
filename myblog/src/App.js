import './App.css';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <div id = "page-body">
        <HomePage/>
        <AboutPage/>
        <ArticleListPage/>
        <ArticlePage/>
      </div>
    </div>
  );
}

export default App;
