import react from "react";
import "../css/App.css"
import DisplayText from "./DisplayTexts/component";
import StaticElements from "./StaticElements";

class App extends react.Component {
    constructor(props){
        super(props);
        this.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Fermentum iaculis eu non diam phasellus vestibulum. Eu facilisis sed odio morbi quis commodo odio aenean sed. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Fringilla urna porttitor rhoncus dolor purus non enim. Lectus sit amet est placerat in egestas erat. Venenatis urna cursus eget nunc scelerisque viverra. Pulvinar sapien et ligula ullamcorper malesuada. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Et egestas quis ipsum suspendisse ultrices gravida dictum. Nulla facilisi etiam dignissim diam. Mattis pellentesque id nibh tortor id. Platea dictumst vestibulum rhoncus est. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Aliquet bibendum enim facilisis gravida. Ullamcorper sit amet risus nullam. Elementum sagittis vitae et leo duis ut diam. Sit amet risus nullam eget. Morbi non arcu risus quis. Pellentesque massa placerat duis ultricies lacus. Ultricies lacus sed turpis tincidunt id. Viverra aliquet eget sit amet tellus cras. Tincidunt id aliquet risus feugiat in ante metus dictum. Fermentum dui faucibus in ornare quam. Magna fringilla urna porttitor rhoncus dolor purus. Cursus sit amet dictum sit amet justo donec enim diam. Massa sed elementum tempus egestas. Sed viverra tellus in hac habitasse platea dictumst. Sem et tortor consequat id porta nibh. Tincidunt eget nullam non nisi est. Purus ut faucibus pulvinar elementum integer enim neque volutpat. Risus quis varius quam quisque id diam vel. Libero id faucibus nisl tincidunt eget nullam non nisi est. Risus in hendrerit gravida rutrum quisque non tellus orci. Massa ultricies mi quis hendrerit dolor magna eget. Sed odio morbi quis commodo odio aenean sed. Orci a scelerisque purus semper. Feugiat nibh sed pulvinar proin. Id semper risus in hendrerit. Auctor augue mauris augue neque gravida.';
    }
    render(){
        return(
            <div className="App">
                <DisplayText wpm={550} text={this.text} />
                <StaticElements/>
            </div>
        )
    }
}

export default App;