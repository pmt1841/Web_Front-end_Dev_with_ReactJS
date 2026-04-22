import styles from './Home.module.css';
import Link from 'next/link';
import {getStudents} from './mock-data/data';

export default function Home() {
    const students = getStudents();

    return (
        <html lang="en">
        <body>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h2 className={styles.title}>📋 Danh sách sinh viên</h2>
                    <table className={styles.table}>
                        <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Tên sinh viên</th>
                            <th className={styles.th}>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map(student => (
                            <tr className={styles.tr} key={student.id}>
                                <td className={styles.td}>{student.id}</td>
                                <td className={styles.td}>{student.name}</td>
                                <td className={`${styles.td} ${styles.lastColumn}`}>
                                    <Link href={`/student/${student.id}`} className={styles.link}>
                                        Xem
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </body>
        </html>
    );
}