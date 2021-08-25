import React, { FC } from "react";
import usePullOutManager from "../../hooks/usePullOutManager";
import PullOut from "./PullOut";

const PullOuts: FC = ({ children }) => {
  const { state, open, close } = usePullOutManager();

  return (
    <>
      <PullOut pullOutId="test_1" origin="left">
        <PullOut.Header
          pullOutId="test_1"
          origin="left"
          open={
            (() => {
              if (!state["test_1"]) return;
              return Object.keys(state["test_1"]).some(
                (key) => state["test_1"]?.[key] || false
              );
            })() || false
          }
        >
          <button onClick={() => open("test_1", "left_2")}>
            Extend next section
          </button>
          <button onClick={() => close("test_1", "left_1")}>
            Close section
          </button>
          <button onClick={() => close("test_1")}>Close all</button>
        </PullOut.Header>
        <PullOut.Section
          sectionId="left_1"
          width={50}
        >
          <h1>This is just a test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(state, null, 2)}
          </pre>
        </PullOut.Section>
        <PullOut.Section
          sectionId="left_2"
          width={50}
        >
          <h1>Just another test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => close("test_1", "left_2")}>
            Close section
          </button>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(state, null, 2)}
          </pre>
        </PullOut.Section>
      </PullOut>
      <PullOut pullOutId="test_2" origin="right">
        <PullOut.Section
          sectionId="right_1"
          width={50}
        >
          <h1>This is just a test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => open("test_2", "right_2")}>
            Extend next section
          </button>
          <button onClick={() => close("test_2", "right_1")}>
            Close section
          </button>
          <button onClick={() => close("test_2")}>Close all</button>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(state, null, 2)}
          </pre>
        </PullOut.Section>
        <PullOut.Section
          sectionId="right_2"
          width={50}
        >
          <h1>Just another test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => close("test_2", "right_2")}>
            Close section
          </button>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(state, null, 2)}
          </pre>
        </PullOut.Section>
      </PullOut>
      <PullOut pullOutId="test_3" origin="top">
        <PullOut.Section
          sectionId="top_1"
          height={25}
        >
          <h1>This is just a test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => open("test_3", "top_2")}>
            Extend next section
          </button>
          <button onClick={() => close("test_3", "top_1")}>
            Close section
          </button>
          <button onClick={() => close("test_3")}>Close all</button>
        </PullOut.Section>
        <PullOut.Section
          sectionId="top_2"
          height={50}
        >
          <h1>Just another test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => close("test_3", "top_2")}>
            Close section
          </button>
        </PullOut.Section>
      </PullOut>
      <PullOut pullOutId="test_4" origin="bottom">
        <PullOut.Section
          sectionId="bottom_1"
          height={25}
        >
          <h1>This is just a test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => open("test_4", "bottom_2")}>
            Extend next section
          </button>
          <button onClick={() => close("test_4", "bottom_1")}>
            Close section
          </button>
          <button onClick={() => close("test_4")}>Close all</button>
        </PullOut.Section>
        <PullOut.Section
          sectionId="bottom_2"
          height={25}
        >
          <h1>Just another test</h1>
          <p>Lorum ipsum and some other filler junk in here</p>
          <button onClick={() => close("test_4", "bottom_2")}>
            Close section
          </button>
        </PullOut.Section>
      </PullOut>
      {children}
    </>
  );
};

export default PullOuts;
