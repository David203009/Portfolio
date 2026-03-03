import Header from "@/components/Header";
import Main from "@/components/Main";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Projects />
      <Experience />
      <Skills />
      <Footer />
      <ScrollObserver />
    </>
  );
}
