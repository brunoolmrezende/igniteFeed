import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

import styles from "./Post.module.css";

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment() {
    event.preventDefault();
    
    setComments([...comments, newComment]);
    setNewComment("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity("");
    setNewComment(event.target.value);
  }

  function handleNewInvalidComment() {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  function deleteComment(commentToDelete) {
    deleteComment = confirm("Tem certeza que deseja deletar o comentário?")
    if(deleteComment) {
      const filteredCommentsAfterDelete = comments.filter(comment => {
        return comment !== commentToDelete;
      });
      setComments(filteredCommentsAfterDelete);
    }
  }

  const isNewCommentEmpty = newComment.length === 0;

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormatted} 
          dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {
          content.map(line => {
            if (line.type === "paragraph") {
              return <p key={line.content}>{line.content}</p>;
              
            } else if (line.type === "link") {
              return <p key={line.content}><a href="#">{line.content}</a></p>;
            }
          })
        }
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment} >
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder="Escreva um comentário"
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleNewInvalidComment}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return  (
              <Comment 
                key={comment} 
                content={comment} 
                onDeleteComment={deleteComment} 
              />
            )
          })
        }
      </div>
     </article>
  );
}