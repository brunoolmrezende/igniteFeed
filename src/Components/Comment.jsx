import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";

import styles from "./Comment.module.css";
import { useState } from "react";

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/brunoolmrezende.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.commentAuthorAndTime}>
              <strong>Bruno Rezende</strong>
              <time 
                title="23 de março às 7:30" 
                dateTime="2024-03-23 07:37:30">
                  Cerca de 1h atrás
              </time>
            </div>
            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24}/>
            </button>
          </header>
            <p>{content}</p>
        </div>

          <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp size={20}/>
              Aplaudir <span>{likeCount}</span>
            </button>
          </footer>
      </div>
    </div>
  );
}