import { useEffect, useState } from "react";
import '../assets/conversor.css'

const Conversor = () => {

    const [convert, setConvert] = useState("");
    const [contador, setContador] = useState(5);
    const [downloadLink, setDownloadLink] = useState("");
    // const [thumbnail, setThumbnail] = useState()

    //1° se tiver link e o btn de converter for clicado entao vai aparecer uma mensagem 

    let linkName = document.querySelector("#linkName");

    function handleConvert(){
        setDownloadLink(convert);
        if(convert.trim() !== ""){
            //verificar se o link é valido
            const regex = /^https?:\/\/[^\s]+$/;
            if(regex.test(convert)){
                console.log("Sucesso!")
                contagemRegressiva()
                linkName.value('');
            }else {
                linkName.value('Erro: O link inserido não é válido.');
              }
        } else {
            linkName.value('Por favor, adicione um link para converter.');
        }
    }

    //2° se for bem sucedido o download vai fazer uma contagem de 5sec e aparecer btn pra download
    function contagemRegressiva(){
        let contagemText = document.querySelector(".contagem");
        contagemText.style.display = 'block'

        setTimeout(()=>{
            document.querySelector(".output-group").style.display = 'block'
            contagemText.style.display = 'none'
            setContador(5)
        }, 5000)
    }

    //enter

    useEffect(() => {
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
    });

  return (
    <main>
        <div className="pageMp3">
            <h1>Conversor mp3</h1>
            <div className="input-group">
                <input type="text" name="link" id="linkName" value={convert} onChange={(e) => setConvert(e.target.value) }/>
                <input type="button" id="Enviar" value="Converter" onClick={handleConvert} />
            </div>
            
            <div className="contagem">
                <p>Espere alguns segundos, seu download vai começar!</p>
                <b>{contador > 0 ? <span>{contador}</span> : <span>Iniciando...</span>}</b>
            </div>

            <div className="output-group">
                <p>Download disponível!</p>
                <a href={downloadLink} download>
                    Clique aqui para baixar
                </a>
            </div>
        </div>
    </main>
  )
}

export default Conversor