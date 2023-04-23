import './App.css';
import Header from './components/Header';
import PostWrapper from './components/PostWrapper';
import LinksWrapper from './components/LinksWrapper';

function App() {
  return (
    <div className="App">
        <Header />
        <PostWrapper title="My First Blog" posts={dummyPost}/>
        <LinksWrapper sections ={dummyLinks} />
    </div>
  );
}

export default App;



const dummyLinks = [
  {
    title: 'Latest',
    links: [
      {title:'Blog Post #1', url:'#'},
      {title:'Blog Post #2', url:'#'},
      {title:'Blog Post #3', url:'#'}
    ]
  },
  {
    title: 'Popular',
    links: [
      {title:'Blog Post #3', url:'#'},
      {title:'Blog Post #1', url:'#'},
      {title:'Blog Post #2', url:'#'}
    ]
  }
]


const dummyPost = [
  {
    title: 'Lorem Desc',
    data: 'Word auto-generates five paragraphs of lorem ipsum with the "()" format. Or you can customize the amount it generates by using the "(paragraph, sentence)" format and inputting the number of paragraphs and sentences you want',
    postTime: 1,
    authorName: 'Lorem',
    imageUrl: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
  },
  {
    title: 'Lorem Desc',
    data: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, vel.',
    postTime: 2,
    authorName: 'Lorem'
  },
  {
    title: 'Lorem Desc',
    data: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, autem ipsa. Facere illum error deleniti ducimus mollitia aut tempora iure?',
    postTime: 5,
    authorName: 'Lorem'
  }
]
