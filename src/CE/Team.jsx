const teamMembers = [
    { name: "Adam Jonson", role: "Developer", image: "/images/adam-jonson.png" },
    { name: "Linda Larson", role: "Manager", image: "/images/linda-larson.png" },
    { name: "Marry Hudson", role: "Designer", image: "/images/marry-hudson.png" },
    { name: "Nina Hudson", role: "Designer", image: "/images/nina-hudson.png" },
    { name: "Margo Larson", role: "Manager", image: "/images/margo-larson.png" },
    { name: "Nicole Scavo", role: "Manager", image: "/images/nicole-scavo.png" },
];

const Team = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 ">
            {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 overflow-hidden rounded-full">
                        <img
                            src={member.image}
                            alt={member.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                </div>
            ))}
        </div>
    );
};

export default Team;