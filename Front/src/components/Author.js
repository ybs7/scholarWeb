

function Author(props) {
    return (
        <div className="min-w-[350px] max-w-[350px] m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6
        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 cursor-pointer">
            <img
                className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                src={props.img}
            />
            <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        {props.name}
                    </p>
                    <p className="text-slate-500 font-medium">{props.occupation}</p>
                </div>

                {props.editEmployee}
            </div>
        </div>
    );
}

export default Author;
