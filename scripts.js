
let localStream;
let remoteStream;

let peerConnection;

const localVideo=document.querySelector('#local-video');
const remoteVideo=document.querySelector('#remote-video');

const userName='Vanshika';
const password='randomPassword'
const socket=io.connect('https://localhost:3000',{
    auth:{
        userName,password
    }
})


const init =async()=>{
    await fetchLocalMedia();

    await createPeerConnection();

    await createOffer();
}

const fetchLocalMedia= async()=>{

    try{
     const localStream=await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
     });

     localVideo.srcObject=localStream;
    }
    catch(error){
        throw error;
    }
}

const createPeerConnection = async()=>{

    try{
    peerConnection= await new RTCPeerConnection();
    remoteStream=new MediaStream();
    remoteVideo.srcObject=remoteStream;


    }
    catch(error){
        throw error;
    }
}


const createOffer = async()=>{
    try{
    const offer=await peerConnection.createOffer();
    console.log(offer);
    peerConnection.setLocalDescription(offer);
    socket.emit('offer',offer);
    }
    catch(error){
        throw error;
    }
}

init();


