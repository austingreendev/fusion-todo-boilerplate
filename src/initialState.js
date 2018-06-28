export default function getInitialState(){
  return {
    todos: [{
      text: 'Visit fusionjs.com',
      completed: true,
      id: 0
    }, {
      text: 'Learn about plugin dependency injection',
      completed: true,
      id: 1
    }, {
      text: 'Try localization options for other languages',
      completed: false,
      id: 2
    }]
  };
}
