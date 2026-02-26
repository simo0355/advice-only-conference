import AdviceOnlyConference from "./AdviceOnlyConference";
import Terms from "./Terms";

export default function App() {
  const path = window.location.pathname;
  if (path === "/terms" || path === "/terms/") {
    return <Terms />;
  }
  return <AdviceOnlyConference />;
}