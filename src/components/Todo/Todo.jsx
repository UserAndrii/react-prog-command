import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, index, delTodo, id, onEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{index + 1}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => delTodo(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick ={()=>onEdit(id)}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
