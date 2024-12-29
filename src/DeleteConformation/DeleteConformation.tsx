import DeleteImage from "../assets/images/notfounded.jpg"
type propsdeleteItem={
    deleteItem:string
}
export default function DeleteConformation({deleteItem}:propsdeleteItem) {
    
  return (
    <div className="text-center">
      <img width={100}  src={DeleteImage} alt="Notfound" />
      <h5 className=''>Delete This {deleteItem} ?</h5>
      <span className="text-muted">are you sure you want to delete this item ? 
        if you are sure just click on delete it</span>
    </div>
  )
}
