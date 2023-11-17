import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { getCookie, removeCookie } from "../cookies/cookies";
import { $CombinedState } from "redux";
import { persistor } from "../..";
import { custom } from "devextreme/ui/dialog";
import { ClickEvent } from "devextreme/ui/button_types";
import notify from "devextreme/ui/notify";
import { Button } from "devextreme-react/button";
export default function Chart() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.login.persons.userId);

  const myDialog = custom({
    title: "사용자 로그아웃",
    messageHtml: "<b>로그아웃 하시겠습니까?</b>",
    buttons: [
      {
        text: "로그아웃",
        onClick: (e: ClickEvent) => {
          return { buttonText: e.component.option("text") };
        },
      },
      {
        text: "취소",
        onClick: (e: ClickEvent) => {
          return { buttonText: e.component.option("text") };
        },
      },
    ],
  });

  //초기화 하는 함수
  const purge = async () => {
    myDialog.show().then(async (dialogResult: { buttonText: string }) => {
      dialogResult.buttonText === "로그아웃"
        ? await persistor.purge().then((res) => {
            removeCookie("accessToken");
            removeCookie("refreshToken");
            removeCookie("roll");
            notify(
              {
                message: "로그아웃 성공",
                width: 300,
                shading: true,
                type: "success",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
          })
        : notify(
            {
              message: "로그아웃 실패",
              width: 300,
              shading: true,
              type: "error",
              displayTime: 300,
            },
            { position: "center", direction: "up-push" }
          );
    });
  };

  return (
    <div>
      <div>{user}</div>

      <Button
        text="LogOut"
        width={120}
        type="default"
        stylingMode="contained"
        onClick={purge}
      />
    </div>
  );
}
