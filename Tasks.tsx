import { useState } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../components/Modal/hooks/useModal"
import { Modal } from "../../components/Modal/Modal"
import { TaskList } from "../../components/TaskList/TaskList"
import { Button } from "../../components/UI/Button/Button"
import { RootState } from "../../store/store"
import { NewTodo, UpdateTodo } from "../../types/todo"
import classes from "./tasks.module.scss"

const options = {
    day: "numeric" as "numeric",
    month: "short" as "short",
    year: "numeric" as "numeric",
}

export default function Tasks() {
    const selectList = useSelector((state: RootState) => state.todo.selectList)

    const [taskState, setTaskState] = useState<UpdateTodo>({
        id: "",
        listId: selectList?.id,
    })

    const { isOpen: isOpenTask, toggle: toggleTask } = useModal()

    return (
        <div className={`${classes.tasks} scroll`}>
            {!selectList ? (
                <p className={classes.empty}>No list selected</p>
            ) : (
                <div className={classes.container}>
                    <h3 className={classes.title}>{selectList.title}</h3>
                    <div className={classes.dateContainer}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <circle cx='12' cy='12' r='10'></circle>
                            <path d='M12 6v6l4 2'></path>
                        </svg>
                        <p className={classes.date}>
                            {new Date(selectList?.createdAt * 1000).toLocaleString(
                                "en-US",
                                options
                            )}
                        </p>
                    </div>
                    <p className={classes.description}>{selectList.description}</p>
                    <TaskList />
                    //TODO дописать обработку и добавить модульные окна
                    <div className={classes.buttons}>
                        <Button
                            size='small'
                            variant='grayPrimary'
                            rounded='round'
                            onClick={() => {}}
                        >
                            Edit list
                        </Button>
                        <Button size='small' rounded='round' onClick={toggleTask}>
                            Add task
                        </Button>
                    </div>
                </div>
            )}

            <Modal isOpen={isOpenTask} toggle={toggleTask}>
                <Modal.Header title='Create task' onClose={toggleTask} />
                <Modal.Footer>
                    <div className={classes.btns}>
                        <Button size='small' onClick={toggleTask} variant='grayPrimary'>
                            Cancel
                        </Button>
                        {taskState.id !== "" && (
                            <Button size='small' variant='danger' onClick={() => {}}>
                                Remove
                            </Button>
                        )}
                        <Button size='small' onClick={taskState.id !== "" ? () => {} : () => {}}>
                            {taskState.id !== "" ? "Update" : "Create"}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
