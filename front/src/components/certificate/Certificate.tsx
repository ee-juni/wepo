import { curUserState, ICertificate } from "./../../atoms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState, useRecoilValue } from "recoil";
import { CertificateAddForm } from "./CertificateAddForm";
import { CertificateEditForm } from "./CertificateEditForm";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import {
    MvpContainer,
    MvpTitleBox,
    MvpTitle,
    MvpContentContainer,
    MvpContentBox,
    MvpContentName,
    MvpContentDate,
    MvpContentDetail,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
    MvpContentAccent,
} from "../user/MyPortfolio";
import { Pencil } from "styled-icons/boxicons-solid";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Trash2 } from "@styled-icons/feather/Trash2";
import { deleteCertificate } from "../../api/api";

export default function Certificate({ info }: any) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    const userToken = sessionStorage.getItem("userToken");
    /* console.log(info); */

    // form 관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true); // 유저에따라 수정버튼 여부 지금은 우선 보이기위해 true 나중에는 defalut undefined 로그인 유저에따라 true or
    const [isEditing, setIsEditing] = useState(false); //수정버튼 클릭시에 폼 여부
    const [targetIndex, setTargetIndex] = useState<number>();

    const location = useLocation();
    const pathName = location.pathname;
    // 추가사항 on/off

    // 자격증 상태
    const [certificates, setCertificates] = useState<ICertificate[]>(info);
    function handleAddFormActive() {
        setAddFormActive((addFormActive) => !addFormActive);
    }
    const onClickDeleteBtn = (certificate: ICertificate, index: number) => {
        const userSeq = parseInt(certificate?.userId!);
        const certificateId = certificate?.certId!;
        deleteCertificate(certificateId, userSeq);
        setCertificates((prev) => {
            const newCertificates = [...prev];
            newCertificates.splice(index, 1);
            return newCertificates;
        });
    };

    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>자격증</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {addFormActive && (
                    <CertificateAddForm
                        setAddFormActive={setAddFormActive}
                        setCertificates={setCertificates}
                        userId={curUser?.userId!}
                    />
                )}
                {!addFormActive &&
                    certificates?.map((certificate: ICertificate, index: number) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{certificate.title}</MvpContentAccent>
                                    <MvpContentDate>{String(certificate.date).slice(0,10)}</MvpContentDate>
                                    <MvpContentDetail>{certificate.org}</MvpContentDetail>
                                    <MvpContentDetail>{certificate.description}</MvpContentDetail>
                                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                    
                                                }}
                                            >
                                                <Pencil color="#3687FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton
                                                onClick={() => onClickDeleteBtn(certificate, index)}
                                            >
                                                <Trash2 color="#3687FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex === index && (
                                <CertificateEditForm
                                    index={index}
                                    certificates={certificates}
                                    setCertificates={setCertificates}
                                    setEditing={setEditing}
                                    setIsEditing={setIsEditing}
                                    setTargetIndex={setTargetIndex}
                                    userId={certificate.userId}
                                    certId={certificate.certId}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            {curUser && pathName === "/mypage" && !addFormActive && (
                <MvpAddButton onClick={handleAddFormActive}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}