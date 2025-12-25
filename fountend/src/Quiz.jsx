  const [quiz, setquiz] = useState([])
    useEffect(() => {
    const fetchQuiz = () => {
      api.get("/db/list")
        .then((res) => res.data)
        .then((data) => {
          console.log(data.quiz);
          setquiz(data.quiz);
        })
        .catch((error) => {
          console.error("Error fetching quiz:", error);
        });
    };
    fetchQuiz();
  }, []);
  import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import api from './api';
