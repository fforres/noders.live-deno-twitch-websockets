// @ts-nocheck
// @ts-ignore
import React from "react";
import styles from "./style.module.css";
import { hot } from "react-hot-loader/root";
import { AnimatePresence, motion } from "framer-motion";

const Vote = ({ votes }) => (
  <motion.span
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 0 }}
    className={styles.votes}
  >
    {votes}
  </motion.span>
);

const spring = {
  type: "spring",
  damping: 30,
  stiffness: 400,
};

const Panel = ({ votes }) => {
  const sorted = Object.values(votes).sort((a, b) => b.votes - a.votes);
  return (
    <div className={styles.panel}>
      {sorted.map((vote) => {
        return (
          <motion.div
            layoutTransition={spring}
            key={vote.name}
            className={styles.row}
          >
            <span className={styles.name}>{vote.name}</span>{" "}
            <div className={styles.voteContainer}>
              <AnimatePresence>
                <Vote key={vote.votes} votes={vote.votes} />
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default hot(Panel);
