import ListaCachorro from "./_components/lista-cachorro";

export default function HomePage({ searchParams }: { searchParams?: { page?: string } }) {
  const params = searchParams ?? { page: '1' };
  return (
    <main>
      <section >
        {/* resolver problema do parametro de páginas */}
        <ListaCachorro searchParams={Promise.resolve(params)} />
        <h2>TESTE ITALO</h2>
      </section>
      
    </main>
  );
}