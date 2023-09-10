import { SignUp } from "@/components/SignUp"


const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-24">
       <div className="flex items-center justify-center px-12 py-9 rounded-lg shadow-2xl
 bg-slate-100">
           <SignUp/>
       </div>
    </div>
  )
}

export default page
