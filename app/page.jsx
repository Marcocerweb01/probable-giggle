import Feed from'@components/feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col"> 
      <h1 className="head_text text-center"> Cerca la tua azienda
        <br className="max-md:hdden" />
        <span className="orange_gradient text-center"> In tutta la tuscia </span>
      </h1>
      <p className="desc text-center">io sono un paragrafo belllissimo</p>
      <Feed />
    </section>

  )
}

export default Home