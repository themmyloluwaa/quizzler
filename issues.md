#### Issue 1

I get this error(warning) when I run my tests.

`Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`
The error (warning) highlights the setQuestion call on in startTrivia on line 40 of App.tsx as the cause of this warning.

##### Steps to fix

I tried refractoring the startTrivia method by adding a startGame state. I also added an mounted ref variable that is set to null initially. The startTrivia handler will make the async call when startGame is true and return the data. This returned data would then be updated in the useEffect and the mounted variable would be set to false. This didn't solve my problem though.

```javascript
let mounted = React.useRef < any > null;

// needs to be wrapped in useCallback cause it is a effect dependency
const startTrivia = React.useCallback(async () => {
  if (startGame === true) {
    try {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      resetGame();
      console.log(newQuestions);
      return newQuestions;
    } catch (e) {
      window.alert("An error has occured");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
}, [startGame]);

// for tracking mounted state
React.useEffect(() => {
  mounted.current = true;
  return () => {
    mounted.current = false;
  };
}, []);

// network call
React.useEffect(() => {
  startTrivia()
    .then((data) => {
      if (mounted.current) {
        setQuestions(data);
      }
    })
    .finally(() => setStartGame(false));
}, [startTrivia, startGame]);

// play button to start the game
<button className="start" onClick={() => setStartGame(true)}>
  Play!
</button>;
```
