import axios from 'axios';

export async function getStaticProps() {
    const res = await axios.get('https://ghibliapi.vercel.app/people');
    return {
        props: {
            people: res.data,
        },
    };
}

export default function Home({ people }) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
                Danh sách nhân vật Studio Ghibli
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Tên</th>
                        <th className="px-4 py-2 border">Giới tính</th>
                        <th className="px-4 py-2 border">Tuổi</th>
                        <th className="px-4 py-2 border">Màu mắt</th>
                        <th className="px-4 py-2 border">Màu tóc</th>
                    </tr>
                    </thead>

                    <tbody>
                    {people.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{p.name}</td>
                            <td className="px-4 py-2 border">{p.gender}</td>
                            <td className="px-4 py-2 border">{p.age}</td>
                            <td className="px-4 py-2 border">{p.eye_color}</td>
                            <td className="px-4 py-2 border">{p.hair_color}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}