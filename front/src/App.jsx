import { Routes, Route } from 'react-router-dom';
import { Auth } from "./pages/Auth";
import { Home } from "./pages/home/Home";
import { AddFriendOnglet } from "./components/common/AddFriendOnglet";
import { AcceptFriendOnglet } from "./components/common/AcceptFriendOnglet";
import { UpdateImgOnglet } from "./components/common/UpdatedImgOnglet";
import { ChatMenu } from "./components/common/chat/ChatMenu";

function App() {

  

  return (
    <div className="app"> 
      <main>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddFriendOnglet />} />
          <Route path="/accept" element={<AcceptFriendOnglet />} />
          <Route path="/updateImg" element={<UpdateImgOnglet />} />
          <Route path="/chat" element={<ChatMenu />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
