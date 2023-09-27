import React, { useState, useEffect } from 'react';
import Logo from '../img/icon.png';
import SearchInput from '../components/SearchInput';
import Card from '../components/Card';
import CardTodo from '../components/CardTodo';
import './styles.scss';

interface Todo {
    id: number;
    title: string;
    content: string;
    itsfav: boolean;
    color: string;
}

const TodoList: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [starActive, setStarActive] = useState(true);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchResults, setSearchResults] = useState<Todo[]>([]);
    const [inputSearch, setInputSearch] = useState('');
    const filteredTodoList = searchResults.length > 0 ? searchResults : (inputSearch === '' ? todos : searchResults);
    const handleSearch = (text: string) => {
        const filteredTodos = todos.filter((todo) =>
            todo.title.toLowerCase().includes(text.toLowerCase())
        );
        setInputSearch(text);
        setSearchResults(filteredTodos);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const toggleStar = () => {
        setStarActive(!starActive);
    };
    const loadTodos = async () => {
        try {
            const response = await fetch('http://localhost:8080/todos');
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('ERRO AO CARREGAR LISTA DO DB: ', error)
        }
    }
    const addTodo = async (newTodo: Todo) => {
        try {
            const response = await fetch('http://localhost:8080/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    title: newTodo.title,
                    content: newTodo.content,
                    itsfav: newTodo.itsfav,
                    color: newTodo.color
                }),
            });
            if (response.ok) {

                const data = await response.json();
                const todoWithId = { ...newTodo, id: data.id };
                setTodos([...todos, { ...todoWithId, color: 'whitebt' }]);
                setTitle('');
                setContent('');
                setStarActive(true);
                const updatedSearch = searchResults.map((t) =>
                    t === newTodo ? { ...t} : t
                );
                setSearchResults(updatedSearch);

            }

        } catch (error) {
            console.error(JSON.stringify(newTodo))
            console.error('ERRO AO ADICIONAR UM NOVO TODO AO DB: ', error, Response)
        }

    };
    const removeTodo = async (id: number) => {
        try {
            await fetch(`http://localhost:8080/todo/${id}`, {
                method: 'DELETE'
            });
            const updatedTodos = todos.filter(todo => todo.id !== id);
            const updatedSearch = searchResults.filter(todo => todo.id !== id);
            setSearchResults(updatedSearch);
            setTodos(updatedTodos);

        } catch (error) {
            console.error('ERRO AO REMOVER TODO DO DB: ', error);
        }
    };
    const moveTodo = async (todo: Todo) => {
        try {
            const updatedTodos = todos.map((t) =>
                t === todo ? { ...t, itsfav: !t.itsfav } : t
            );
            setTodos(updatedTodos);
            const requestBody = {
                title: todo.title,
                content: todo.content,
                itsfav: !todo.itsfav,
                color: todo.color,
                id: todo.id
            };
            await fetch(`http://localhost:8080/todo/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)

            });
            const updatedSearch = searchResults.map((t) =>
                t === todo ? { ...t, itsfav: !t.itsfav } : t
            );
            setSearchResults(updatedSearch);
        } catch (error) {
            console.error('ERRO AO MOVER TODO DO DB: ', error);
        }
    };
    const updateTitleAndContent = async (todo: Todo, newTitle: string, newContent: string) => {
        try {
            const updatedTodos = todos.map((t) =>
                t === todo ? { ...t, title: newTitle, content: newContent } : t
            );
            setTodos(updatedTodos);

            const requestBody = {
                title: newTitle,
                content: newContent,
                itsfav: todo.itsfav,
                color: todo.color,
                id: todo.id
            };

            await fetch(`http://localhost:8080/todo/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const updatedSearch = searchResults.map((t) =>
                t === todo ? { ...t, title: newTitle, content: newContent } : t
            );
            setSearchResults(updatedSearch);
        } catch (error) {
            console.error('ERRO AO ATUALIZAR TODO NO DB: ', error);
        }
    };
    const updateColor = async (todo: Todo, newColor: string) => {
        try {
            const updatedTodos = todos.map((t) =>
                t === todo ? { ...t, color: newColor } : t
            );
            const updatedSearch = searchResults.map((t) =>
                t === todo ? { ...t, color: newColor } : t
            );
            setSearchResults(updatedSearch);
            setTodos(updatedTodos);
            const requestBody = {
                title: todo.title,
                content: todo.content,
                itsfav: todo.itsfav,
                color: newColor,
                id: todo.id
            };
            await fetch(`http://localhost:8080/todo/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

        } catch (error) {
            console.error('ERRO AO MOVER TODO DO DB: ', error);
        }


    };

    useEffect(() => {
        loadTodos();
    }, []);
    const VerLista = () => {
        console.log(todos)
    }
    return (
        <div>
            <div className="TodoList-header">
                <img src={Logo} alt="Logo Notes" title="Todo List" draggable="false" />
                <h2>CoreNotes</h2>
                <SearchInput onSearch={handleSearch} />

            </div>
            <div className="TodoList-content">
                <div className="Insert-Todo centered">
                    <Card
                        title={title}
                        content={content}
                        starActive={starActive}
                        onTitleChange={handleTitleChange}
                        onContentChange={handleContentChange}
                        onToggleStar={toggleStar}
                        onAddTodo={() => {
                            addTodo({
                                title,
                                content,
                                itsfav: starActive,
                                color: 'whitebt',
                                id: 0
                            });
                        }}
                    />
                </div>
                <div className='CardsTodo'>
                    <h1 className="Favtab textpage-style1">Favoritas</h1>
                    <div className='favs divpage-style1'>
                        {filteredTodoList && filteredTodoList.map((todo, index) => {
                            if (todo.itsfav) {
                                return (
                                    <CardTodo
                                        key={index}
                                        title={todo.title}
                                        content={todo.content}
                                        itsfav={todo.itsfav}
                                        color={todo.color}
                                        onToggleStar={() => moveTodo(todo)}
                                        updateTitleAndContent={(newTitle, newContent) => updateTitleAndContent(todo, newTitle, newContent)}
                                        onUpdateColor={(newColor) => updateColor(todo, newColor)}
                                        onDelete={() => removeTodo(todo.id)}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                    <h1 className="Othertab textpage-style1">Outras</h1>
                    <div className='other divpage-style1'>
                        {filteredTodoList && filteredTodoList.map((todo, index) => {
                            if (!todo.itsfav) {
                                return (
                                    <CardTodo
                                        key={index}
                                        title={todo.title}
                                        content={todo.content}
                                        itsfav={todo.itsfav}
                                        color={todo.color}
                                        onToggleStar={() => moveTodo(todo)}
                                        updateTitleAndContent={(newTitle, newContent) => updateTitleAndContent(todo, newTitle, newContent)}
                                        onUpdateColor={(newColor) => updateColor(todo, newColor)}
                                        onDelete={() => removeTodo(todo.id)}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>

            <button onClick={VerLista}>VerLista</button>
        </div>
    );
};

export default TodoList;
