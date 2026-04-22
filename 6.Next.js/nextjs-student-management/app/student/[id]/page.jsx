import Link from 'next/link';
import styles from './StudentDetail.module.css';

export default async function StudentDetail({params}) {
    const {id} = await params;

    return (
        <html>
        <body>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.card}>
                        <h2 className={styles.title}>🎓 Thông tin sinh viên</h2>
                        <p className={styles.text}>
                            Mã sinh viên: <strong>{id}</strong>
                        </p>
                        <Link href="/" className={styles.backLink}>← Quay về danh sách</Link>
                    </div>
                </main>
            </div>
        </body>
        </html>
    );
}