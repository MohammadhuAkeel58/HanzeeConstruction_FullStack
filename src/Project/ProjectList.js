import Modal from "./Modal"

function ProjectList({ onClose, open, title, location, startDate, endDate, budget,employees })
{

  return (
    <div className='w-full h-ful pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0  backdrop-blur-md py-5 flex justify-center '>
      <Modal modalLable='Project List' onClose={onClose} open={open}>
        <div className='w-full h-full flex flex-col justify-around'>
          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Title
            </label>
            <h2>{title}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Location
            </label>
            <h2>{location}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Start Date
            </label>
            <h2>{startDate}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              End Date
            </label>
            <h2>{endDate}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Budget
            </label>
            <h2>{budget}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Employees
            </label>
            <h2>{employees}</h2>
          </div>

        </div>
      </Modal>
    </div>
  )
}

export default ProjectList