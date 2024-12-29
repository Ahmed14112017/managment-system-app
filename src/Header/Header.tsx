type proptitle={
    title:string
}
export default function Header({title}:proptitle) {
  return (
    <div className="header-section py-5 px-3 text-white">
        <div className="header-content">
        <h3>Welcome <span>{title}</span></h3>
        <p>You can add project and assign tasks to your team</p>
        </div>
        
    </div>
  )
}
