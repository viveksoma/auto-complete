## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
### Answer:
**Component:** React class component that re-renders on any state/prop change.
**PureComponent:** Extends Component, but implements shallow comparison (shouldComponentUpdate) to prevent unnecessary re-renders.
### Example where PureComponent might break the app:
```
class Parent extends React.Component {
  state = { user: { name: "Alice", age: 25 } };

  updateAge = () => {
    this.state.user.age += 1;
    this.setState({}); // Triggers re-render
  };

  render() {
    return <Child user={this.state.user} />;
  }
}

class Child extends React.PureComponent {
  render() {
    console.log("Child Rendered");
    return <p>{this.props.user.age}</p>;
  }
}
```
**Issue:** Since user is mutated, PureComponent does shallow comparison, sees the same reference, and does NOT re-render.
**Fix:** Use immutable updates:
```
this.setState({ user: { ...this.state.user, age: this.state.user.age + 1 } });
```

## 2. Context + ShouldComponentUpdate might be dangerous. Why?
### Answer:
- **Context** updates cause all consuming components to re-render.
- **shouldComponentUpdate** blocks updates unless explicitly allowed.
- If a component relies on context but has **shouldComponentUpdate** returning false, it won't receive context updates.

## 3. Describe 3 ways to pass information from a component to its PARENT.
### Answer:

- Callback Function:  Pass a function from parent to child, then call it in the child.
- Updating State via Context: Parent provides a context setter, child calls it.
- Ref with forwardRef: Parent accesses child's state/methods using ref.

## 4. Give 2 ways to prevent components from re-rendering.
### Answer:

- Use React.memo() for functional components
- Use useMemo() or useCallback() to optimize performance

## 5. What is a fragment and why do we need it?
### Answer:

<Fragment> allows grouping elements without adding an extra DOM node.

## 6. Give 3 examples of the HOC pattern.
### Answer:

- Authentication HOC
```
function withAuth(Component) {
  return function WrappedComponent(props) {
    return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;
  };
}
```
- Logging HOC
```
function withLogger(Component) {
  return function Wrapped(props) {
    console.log("Component Rendered");
    return <Component {...props} />;
  };
}
```
- Theming HOC
```
function withTheme(Component) {
  return function WrappedComponent(props) {
    const theme = useContext(ThemeContext);
    return <Component {...props} theme={theme} />;
  };
}
```

## 7. Exception Handling in Promises, Callbacks, and Async/Await
### Answer:

- Promises: Use .catch() at the end.
- Callbacks: .catch(err => handleErr(err))
- Async/Await: try { await something } catch (err) { handleErr(err) }

## 8. setState: Arguments & Why Async?
### Answer:

- Takes 2 arguments: (newState, callback)
- Async because: React batches multiple updates for performance.

## 9. Convert Class to Function Component
### Answer:

- Remove extends Component.
- Replace this.state with useState.
- Replace lifecycle methods (componentDidMount) with useEffect.
- Remove this. from handlers.

## 10. Ways to Style Components
### Answer:

- CSS File (import './styles.css')
- Inline Styles (style={{ color: "red" }})
- CSS Modules (styles.button)
- Styled-Components (styled.button)

## 11. Render HTML String from Server
### Answer:

```
<div dangerouslySetInnerHTML={{ __html: "<h1>Hello</h1>" }} />
```
Correctly renders server-sent HTML (sanitize first!).