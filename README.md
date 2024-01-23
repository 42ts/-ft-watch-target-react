# `watch-target-react` - Util watchTarget wrapper for React

React wrapper of util watchTarget

## Usage

```jsx
function Portal({ children }) {
  const { addComponent } = useContext(PortalContext);
  const childrenWatchTarget = useWatchTarget(children);
  useEffect(
    () => addComponent(toComponent(childrenWatchTarget)),
    [addComponent]
  );
  return null;
}

function toComponent(childrenWatchTarget) {
  return function Component() {
    return <>{useLayoutWatchValue(childrenWatchTarget)}</>;
  };
}
```
