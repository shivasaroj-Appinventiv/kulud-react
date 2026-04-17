interface Props{
    children:React.ReactNode
}

const PageLayout=({children}:Props)=>{
    return(
        <div className="bg-gray-100">{children}</div>
    )
}

export default PageLayout;      