export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
        <form>
          <input id="email" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required />
          <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="password" placeholder="Enter your password" required />
          <div className="py-6 text-center">
            <button type="submit" className="w-56 mb-3 bg-indigo-500 py-2.5 rounded-full text-white ">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
