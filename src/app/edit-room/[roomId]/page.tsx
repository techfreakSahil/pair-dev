import { getRoom } from "@/services/room";
import EditRoomForm from "./edit-room";

export default async function EditRoom({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const room = await getRoom(params.roomId);
  if (!room) {
    return <div>No room for such id exist</div>;
  }
  return (
    <div className="container mx-auto flex flex-col gap-10 pt-12 pb-12">
      <h1 className="font-bold text-2xl">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
