import { Link } from "react-router-dom";

function CompanyProfileContent({profile}) {

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-12">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">

        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-gray-500 text-sm">Company Name</p>
          <p className="text-gray-400 text-sm">Joined in 2021</p>
        </div>

      </div>

      {/* Personal Info */}
      <div className="space-y-4">

        <h3 className="font-semibold text-gray-700">
          Personal Information
        </h3>

        {profile.map((user,idx)=>{
          return <div key={idx} className="space-y-3">
              <p className="text-lg">
                  <span className="font-medium">Full Name :</span> {user.name}
                </p>

                <p className="text-lg">
                  <span className="font-medium">Email :</span> {user.email}
                </p>

                <p className="text-lg">
                  <span className="font-medium">Phone Number :</span> {user.phone}
                </p>

                <p className="text-lg max-w-xl">
                  <span className="font-medium">Location : </span>
                  {user.location}
                </p>

          </div>
        })}
      </div>

      {/* Edit Button */}
      <div className="mt-8">
        <Link to="/company/profile-edit">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer">
          edit profile
        </button>
        </Link>
      </div>

    </div>
  );
}

export default CompanyProfileContent;