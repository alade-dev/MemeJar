import { memes } from "../../../constants";

const Saved = () => {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold text-center my-6 bg-secondary rounded-full px-4 py-2 w-fit m-auto">
        Saved Memes{" "}
      </h1>
      <div className="px-10 py-4">
        {memes.map((meme) => {
          return (
            <div
              key={meme.id}
              className="rounded-md p-2 bg-primary outline-none border-none border-primary relative mb-6"
            >
              <div className="flex items-center gap-2 ">
                <img
                  src={meme.img}
                  alt=""
                  width={34}
                  height={34}
                  className="rounded-full object-contain"
                />
                <h3 className="font-semibold text-gray-100">Concepify</h3>
              </div>
              <p className="text-sm leading-8 text-gray-300">
                {meme.description}
              </p>
              <img src={meme.meme} alt="" className="w-[100%] " />
              <img
                src={meme.like}
                alt=""
                width={20}
                height={20}
                className="ml-auto my-2 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Saved;
