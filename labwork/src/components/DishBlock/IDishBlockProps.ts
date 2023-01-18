import IDish from "../../interfaces/IDish";

export default interface IDishBlockProps{
    dish: IDish,
    editDish: React.MouseEventHandler<HTMLButtonElement>,
    deleteDish: React.MouseEventHandler<HTMLButtonElement>
}