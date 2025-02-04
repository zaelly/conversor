import { useEffect, useState } from "react";
import '../assets/conversor.css'

const Conversor = () => {

    const [convert, setConvert] = useState("");
    const [contador, setContador] = useState(5);
    const [downloadLink, setDownloadLink] = useState("");
    const [downloadTime, setTimeDownload] = useState("");
    // const [thumbnail, setThumbnail] = useState()

    //1° se tiver link e o btn de converter for clicado entao vai aparecer uma mensagem 

    function handleConvert(){
        setDownloadLink(convert);
        if(convert.trim() !== ""){
            //verificar se o link é valido
            const regex = /^https?:\/\/[^\s]+$/;
            if(regex.test(convert)){
                console.log("Sucesso!")
                contagemRegressiva()
            }else {
                setConvert('Erro: O link inserido não é válido.');
            }
        } else {
            setConvert('Por favor, adicione um link para converter.');
        }
    }

    //2° se for bem sucedido o download vai fazer uma contagem de 5sec e aparecer btn pra download
    function contagemRegressiva(){
        let contagemText = document.querySelector(".contagem");
        contagemText.style.display = 'block'
        setContador(5)

        let tempo = 5;

        const interval = setInterval(()=>{
            tempo-=1;
            setContador(tempo)

            if(tempo <= 0){
                clearInterval(interval);
                setContador(0);
            }
        }, 1000)

        setTimeout(()=>{
            document.querySelector(".output-group").style.display = 'block'
            contagemText.style.display = 'none'
        }, 5000)
    }

    //3° se clicar no btn de download vai baixar o arquivo
    function downloadVideo(){
        const link = document.querySelector("#linkName");
        link.href = downloadLink;
        link.download = "mp4";
        link.click();
    }

    function toggleBtns(){
        // let mp3 = document.querySelector("#mp3");
        // let video = document.querySelector("#video");
        document.querySelectorAll(".toggle-btn").forEach(button => {
            button.addEventListener("click", function () {
                document.querySelectorAll(".toggle-btn").forEach(btn => {
                    btn.classList.remove("active");
                });
                this.classList.add("active");
            });
        });
    }

    //quando uma nova conversao for feita depois de uma outra, o download vai 
    // ser refeito e nao vai aparecer varios downloads
    useEffect(() => {

        toggleBtns();

        //enter
        function enter(e) {
            if (e.key === "Enter") {
                handleConvert();
            }
        }

        const inputEnv = document.querySelector("#linkName");
        if (inputEnv) {
            inputEnv.addEventListener("keyup", enter);
        }

        return () => {
            if (inputEnv) {
                inputEnv.removeEventListener("keyup", enter);
            }
        };
    }, [convert]);

  return (
    <main>
        <div className="pageMp3">
            <h1>Conversor</h1>

            <div className="input-group frequency-toggle ">
                <button className="toggle-btn active" id="mp3" data-frequency="mp3">mp3</button>
                <button className="toggle-btn" id="video" data-frequency="video">video </button>
            </div>

            <div className="input-group">
                <input type="text" name="link" id="linkName" value={convert} onChange={(e) => setConvert(e.target.value) } onClick={() => setConvert("")} placeholder="Adicione um link para converter"/>
                <input type="button" id="Enviar" value="Converter" onClick={handleConvert} />
            </div>
            
            <div className="contagem">
                <p>Espere alguns segundos, seu download vai começar!</p>
                <div>{contador > 0 ? <span className="contador">{contador}</span> : <span>Iniciando...</span>}</div>
            </div>

            <div className="output-group">
                <p>Download disponível!</p>
                <a href={downloadLink} download> 
                 Download
                </a>
            </div>

            <div style={{"display": "none"}}>
                <p>Tempo de download: {downloadTime}</p>
            </div>
        </div>
    </main>
  )
}

export default Conversor