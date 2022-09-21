import React from "react";
import ReactDOM from 'react-dom';
import LocalizedStrings from 'react-localization';


let strings = new LocalizedStrings({
    en:{
        type_signature:"Signature type",
        do_choice:"Choose a signature type",
        choose:"Choose",
        cancel:"Cancel",
        dashboard:"Dashboard",
        send:"Sending",
        model:"Model",
        certificate:"Certificate",
        certificateddocument:"Certificated document",
        contact:"Contact",
        teams:"Teams",
        logout:"Logout",
        pending:"Pending",
        ended:"Ended",
        all:"All",
        archived:"Archived",
        members:"Members",
        group:"Groups",
        setting:"Settings",
        billing:"Billing",
        submit : "Submit",
        continuous:"Continuous",
    },
    fr: {
        type_signature:"Type de signature",
        do_choice:"Faites un choix",
        choose:"Choisir",
        cancel:"Annuler",
        dashboard:"Tableau de bord",
        send:"Envois",
        model:"Modèle",
        certificate:"Certificat",
        certificateddocument:"Document Certifié",
        contact:"Contact",
        teams:"Equipe",
        logout:"Déconnexion",
        pending:"En cours",
        ended:"Finir",
        all:"Tout",
        archived:"Archivé",
        members:"Membres",
        group:"Groupes",
        setting:"Paramétrage",
        billing:"Facturation",
        profile:"Mon profile",
        submit:"Enregistrer",
        continuous:"Continuer",
    }
});

export default strings;


