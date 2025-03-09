Cahier des charges
POC - Freeplay

Sommaire : 
Overview de l’ensemble des features nécessaires pour commercialiser le produit  
Liste des différents flows
Questionnaire de Qualification du Freelance (pour inscription)

Overview de l’ensemble des features nécessaires pour commercialiser le produit  
1. Fonctionnalités de Base
Création de Compte: Inscription et gestion de profil pour freelances.
Gestion des Factures: Téléchargement, création, et suivi des factures.
Demande de Financement: Formulaire pour demander le financement d'une facture.
Tableau de Bord: Vue d’ensemble des factures et des financements.
Notifications: Alertes pour le suivi des factures et des étapes de financement.
2. Intégrations API
1. Authentification et Gestion des Identités
Auth0 / Firebase Authentication : Gestion sécurisée des comptes utilisateurs (inscription, connexion).
France Connect : Authentification des utilisateurs avec les identifiants de l’administration française.
Onfido / Sumsub / Synaps : Vérification d’identité avancée avec biométrie faciale et contrôle documentaire.
Datakeen : Vérification d’identité en ligne pour une authentification rapide.
2. Vérification des Entreprises et Légitimité
Societe.com : Vérification des informations des entreprises françaises via leur SIRET.
Papers : Vérification légale et financière des entreprises, évaluation de leur solvabilité.
3. Gestion et Vérification des Comptes Bancaires
Ficoba : Accès aux informations sur les comptes bancaires pour vérifier leur validité et propriété.
Treezor / Plaid / Budget Insight : API Open Banking pour gérer les transactions, virements et vérifications bancaires.
Bridger : Alternative pour l’Open Banking et la gestion des paiements.
4. Paiements et Transactions Financières
Stripe / PayPal API : Gestion des transactions financières, avances et remboursements.
Trezor : Intégration Open Banking pour le transfert sécurisé des fonds.
5. Communication et Notifications
Twilio / SendGrid : Envoi de SMS et d’emails pour les notifications et communications avec les utilisateurs.
6. Facturation et Comptabilité
Pennylane : Gestion des factures, intégration avec des logiciels comptables.
QuickBooks / Xero API (mentionnés comme alternatives) : Création et gestion des factures.
7. Analyse de Crédit et Scoring
Experian / Equifax : Évaluation de la solvabilité des clients avant de leur accorder un financement.
8. Recouvrement des Créances
Ruby Payeur : Gestion des créances impayées, recouvrement amiable et judiciaire.
9. Sécurité et Conformité
AWS KMS / Google Cloud KMS : Chiffrement des données sensibles pour protéger les informations des freelances.
GDPR / PCI-DSS Compliance : Respect des normes légales et réglementaires.
10. Gestion des Contrats et Signatures Électroniques
Pandadoc / Docusign / Yousign : Génération et signature électronique des documents contractuels.
11. CRM et Relation Client
Salesforce / HubSpot : Gestion des relations clients et suivi des interactions.
12. Suivi de l’Activité et Reporting
Google Maps API : Vérification et normalisation des adresses postales.
API de Reporting (nom non précisé) : Génération de rapports financiers personnalisés.

3. Fonctionnalités Avancées
Intelligence Artificielle: Analyse prédictive pour évaluer les risques de non-paiement.
Dashboard Analytique: Statistiques détaillées sur les performances des factures et des financements.
Intégration ERP: Connexion avec des systèmes ERP pour une meilleure gestion des données financières et opérationnelles.
API de Reporting: Permettre aux utilisateurs de générer des rapports financiers personnalisés.
4. Sécurité et Conformité
Sécurité des Données (ex: encryption via AWS KMS, Google Cloud KMS): Chiffrer les données sensibles pour protéger les informations des freelances.
Conformité (ex: GDPR, PCI-DSS): S'assurer que la plateforme respecte les normes légales et réglementaires pertinentes.
5. Support et Assistance
Chatbot (ex: Intercom, Drift): Pour offrir un support en temps réel.
Support Ticketing (ex: Zendesk): Système pour gérer les demandes d'assistance des utilisateurs.

Liste des flow - process de financement freelpay
1. Flow de la simulation
2. Flow de l'inscription
3. Flow KYC préalable & demande de financement
4. Flow du financement & de la facturation
5. Flow de recouvrement

1. Flow de simulation (sans inscription préalable)
Objectif : Permettre à un freelance ou une PME de simuler le financement d'une facture sans créer de compte.
Étapes du flow :
Accès à la page de simulation
Le freelance accède à la page de simulation sur le site web.
Possibilité d’uploader une facture ou d’entrer manuellement les données clés (montant, échéance, client).
Saisie des informations de la facture
Montant de la facture
Date d’échéance
Type de client (PME, grand compte, etc.)
Secteur d'activité
Le freelance donne ses informations de contact : 
Nom Prénom
Numéro de téléphone
Adresse mail
Siret
Analyse préliminaire via l'algorithme de scoring IA
Vérification instantanée des données fournies.
Estimation du taux d'escompte dynamique en fonction des paramètres.
Affichage du résultat de simulation
Eligibilité / non éligibilité
Proposition du montant financé potentiel.
Détail du taux d’escompte estimé.
Conditions générales (délais, frais, etc.).
Appel à l'action (conversion)
Option d'inscription pour finaliser la demande.
Exportation du résultat sous format PDF/email.


2. Flow d'inscription
Objectif : Inscription complète du freelance pour accéder aux services de financement de factures.
Étapes détaillées du flow :

1. Accès à la page d'inscription
L'utilisateur peut accéder à l'inscription via plusieurs points d'entrée :
Depuis la page de simulation après avoir effectué une estimation.
Directement via le site web (bouton "S'inscrire").
Via un lien de redirection après une interaction avec un email ou un réseau social.
Options de connexion proposées :
Inscription via email et mot de passe.
Inscription via téléphone (OTP).
Connexion rapide via Google, LinkedIn ou autres services d'identité (SSO).

2. Formulaire d'inscription
L'utilisateur doit renseigner les informations suivantes :
Informations personnelles
Nom
Prénom
Email
Numéro de téléphone (avec vérification OTP)
Mot de passe sécurisé (8+ caractères, majuscules, chiffres, caractères spéciaux, MFA possible)
Informations professionnelles
Statut juridique (Freelance, Auto-entrepreneur, Société)
Numéro SIRET ou équivalent selon pays
Activité principale (choix dans une liste déroulante)
Adresse professionnelle
Mot de passe et sécurité
Mot de passe sécurisé
Option d'authentification à double facteur (2FA/MFA)
Questionnaire de qualification du freelance (cf : Annexe)
Volume mensuel de facturation moyen
Délais de paiement habituels de ses clients
Type de clients (PME, grandes entreprises, institutions publiques, etc.)
Objectif du financement (trésorerie, croissance, etc.)

3. Création du compte et accès au tableau de bord
Étapes du processus après validation :
Confirmation de l’inscription envoyée par email (lien de vérification).
Redirection vers le tableau de bord personnalisé une fois validé.
Statut "Compte en cours de validation" affiché jusqu'à l’approbation complète des documents.
Accès limité aux fonctionnalités en attendant la validation complète (ex. pas de soumission de facture possible).

4. Notification utilisateur
Des notifications automatiques sont envoyées à différentes étapes :
Email/SMS de confirmation d’inscription
"Votre inscription a bien été prise en compte, nous vérifions vos informations."
Email/SMS de validation de compte
"Votre compte est validé, vous pouvez désormais soumettre vos factures pour financement."
Rappels et assistance
Rappel en cas de documents manquants ou en attente.
Invitation à compléter le profil via email ou notification push.

5. Prochaine étape après inscription
Une fois l'inscription validée, l'utilisateur est invité à :
Compléter son profil (ajouter des clients, définir des préférences).
Soumettre une première facture pour financement.
Suivre une démo guidée du tableau de bord pour mieux comprendre les services.


3. Flow KYC préalable & demande de financement
Objectif : Vérifier l'identité et la solvabilité du freelance avant l'accès au financement, tout en assurant la conformité aux exigences réglementaires (AML, KYC).

Étape 1 : Accès à la vérification KYC
L'utilisateur accède à la section "Vérification KYC" depuis son tableau de bord après son inscription.
Message d'information expliquant la nécessité du KYC pour sécuriser les financements.
Bouton d’initiation du processus avec suivi de progression.

Étape 2 : Vérification de l'Identité
Intégration avec un Prestataire de Sécurité (ex : Onfido, Sumsub, Synaps)
Téléchargement du document d’identité
Options : Carte d’identité, passeport, permis de conduire.
Vérification automatique des données via OCR.
Vérification de la validité et de la correspondance avec l’identité déclarée.
Vérification biométrique (Selfie en temps réel)
Demande à l'utilisateur de prendre un selfie en temps réel.
Comparaison automatisée entre le selfie et le document d'identité.
Validation via détection d'activité (preuve de vie pour éviter la fraude).
Retour utilisateur
Envoi de notifications en cas de validation ou besoin de re-soumission des documents.
Affichage du statut (En cours / Validé / Rejeté).

Étape 3 : Téléchargement des Documents Fiscaux
L’utilisateur doit fournir des documents financiers pour prouver sa stabilité et sa solvabilité.
Upload des documents légaux : 
Kbis 
Justificatif de statut / Attestation Ursaff
RIB professionnel
Justificatif de domicile
Upload des liasses fiscales
Période requise : Dernières 3 années fiscales (au minimum 1 an).
Formats acceptés : PDF, JPEG, PNG.
Vérification automatique des informations clés (revenus, charges, bénéfices).
Upload des relevés bancaires (12 derniers mois)
Vérification des flux de trésorerie, des entrées récurrentes, et des dépenses.
Analyse de solvabilité automatisée.
Option de connexion directe via Open Banking pour éviter l'upload manuel.

Étape 4 : Connexion de la Carte Bancaire
Intégration avec Stripe ou autre prestataire de paiement sécurisé
Saisie des informations de carte bancaire
Numéro de carte, date d’expiration, CVC.
Authentification 3D Secure si nécessaire.
Stockage sécurisé pour paiements futurs (frais de service, réception des fonds).
Validation de la carte
Débit temporaire de 1€ remboursé immédiatement pour vérification.
Confirmation par email/SMS que la carte est bien enregistrée.

Étape 5 : Connexion des Comptes Bancaires
Intégration avec un Système d'Open Banking (ex : Trezor, Plaid, Budget Insight)
Sélection de la banque
Interface permettant de choisir la banque du freelance.
Connexion sécurisée via API bancaire réglementée (DSP2).
Consentement utilisateur
L’utilisateur doit autoriser l’accès aux données financières.
Explication claire des données consultées (entrées, sorties, soldes, historique).
Analyse des flux financiers
Identification des revenus récurrents et des dépenses.
Prévision des capacités de remboursement pour évaluer le risque.

Étape 6 : Confirmation et Finalisation
Vérification des informations
Analyse automatique des documents et des connexions bancaires.
Vérification humaine en cas de suspicion ou de documents manquants.
Activation du compte
Une fois toutes les vérifications réussies, le statut du compte passe à "Validé".
Notification envoyée par email et SMS confirmant l'activation.
Accès complet aux services de financement.
Prochaines étapes suggérées
Invitation à soumettre une première facture pour financement.
Tutoriel rapide sur l’utilisation de la plateforme.
=> Validation manuelle par le service conformité en cas de doute
=> Notification de l'état de validation en temps réel (accepté/rejeté/en attente)

4. Flow du financement & de la facturation 
Objectif : Automatiser le processus de financement en passant par la génération et validation d’un devis, suivi de la facturation, et validation du financement.

1. Création du devis (DRAFT)
Étape 1: Connexion/Inscription
L'utilisateur se connecte à son compte existant ou s'inscrit (via Auth0).
Redirection vers le tableau de bord utilisateur pour initier une demande de financement.
Étape 2: Génération d’un double devis - freelance & client finale
Le freelance saisit les informations requises pour créer un devis directement sur Freelpay.
Le devis est ensuite créé automatiquement dans Pennylane via API.
Un champ libre est ajouté pour inclure une clause légale du type :
"Freelpay ne se substitue pas au fournisseur dans la réalisation de sa mission..."
Statut initial du devis : DRAFT (brouillon)
L'utilisateur peut prévisualiser le devis avant validation.
"Message : Pour que le rachat de cette facture soit effectif, vous et votre client devez d’abord signer le devis édité via Freelpay, correspondant à cette facture."

2. Envoi du devis au freelance & client final (SENT)
Étape 3: Validation et envoi pour signature électronique
Une fois validé par le freelance, le devis est généré et enregistré dans Pennylane.
Intégration avec Zapier pour connecter un service de signature électronique (Yousign, Docusign, Pandadoc).
Envoi automatique du devis pour signature au client du freelance (entreprise cliente B vers C).
Statut du devis passe à : SENT (envoyé pour signature)
"Message : Votre partenaire commercial souhaite financer une facture vous concernant via Freelpay. En acceptant ce devis, vous confirmez votre accord et déclenchez l’avance des fonds. Vous serez responsable du remboursement de la facture correspondante sous 30 jours à Freelpay. En cas de non-paiement, Freelpay se réserve le droit d'engager des démarches juridiques."

Étape 4: Validation de la mission
Une fois le devis signé, la mission est réalisée par le freelance.
Preuve de réalisation de la mission demandée (attestation de service rendu, bons de livraison, etc.).* factulatif
Sur validation, génération automatique d'une facture B vers C, prenant en compte le devis signé.

3. Génération de la facture d’achat pour Freelpay (SIGNED)
Étape 5: Facturation fournisseur (B vers A - nous)
Freelpay génère automatiquement une facture d’achat dans Pennylane (A vers B).
Cette facture d'achat est visible sur le dashboard du freelance.
Objectif : assurer une continuité de facturation pour tous les clients.
Statut de la facture d’achat : SIGNED (signée et prête à validation)

4. Acceptation de la facture d’achat et génération de la facture de vente (ACCEPTED/FREELPAID)
Étape 6: Validation par le freelance
Le freelance reçoit une notification pour accepter la facture d’achat (avec l’escompte).
Un numéro de facture, est intégré dans Pennylane.
Une fois acceptée, statut mis à jour sur le dashboard à ACCEPTED/FREELPAID.
"Message : En cas de non-paiement de la facture par votre partenaire commercial, Freelpay se réserve le droit de vous réclamer le remboursement des fonds avancés. À défaut de règlement dans les délais impartis, des pénalités de retard pourront être appliquées et Freelpay pourra engager des démarches de recouvrement, y compris des actions juridiques si nécessaire."
Étape 7: Génération de la facture de vente
Après acceptation de la facture d'achat, une facture de vente est générée et envoyée sur le dashboard du freelance.
Envoi automatique au client B vers C pour règlement final.
Suivi du statut en temps réel (payé, en attente, retard).

5. Suivi et financement
Étape 8: Déblocage du financement
Une fois la facture de vente acceptée par le client final (C), Freelpay avance les fonds au freelance.
Déblocage du paiement sur le compte bancaire du freelance via Stripe.
Statut final de la demande de financement : PAID.
Étape 9: Suivi post-financement
Mise à jour du tableau de bord utilisateur avec :
Historique des transactions.
Statut des factures.
Suivi des échéances de paiement du client final.
Notifications automatiques en cas de retard de paiement.

Flow de Recouvrement – Freelpay
Objectif : Assurer un suivi efficace des factures impayées et maximiser les chances de recouvrement tout en maintenant une bonne relation commerciale avec les clients du freelance. Ce processus est divisé en plusieurs étapes allant des rappels amiables au recouvrement judiciaire en cas de non-paiement.

Étape 1 : Rappel avant échéance (Prévention du retard)
Objectif : Encourager le paiement avant la date d’échéance pour éviter tout retard.
Actions :
J-7 avant échéance :
Envoi d’un email de rappel avec le détail de la facture.
SMS de notification au client.
Affichage d’un rappel sur le tableau de bord du freelance et du client.
Contenu du message :
Sujet : 📅 Rappel – Facture [Numéro] à régler avant le [Date]
Bonjour [Nom du client],
Nous vous rappelons que la facture [Numéro] d’un montant de [Montant]€ arrivera à échéance le [Date].
👉 Effectuer le paiement maintenant
Merci pour votre attention.
Cordialement,
L’équipe Freelpay

Étape 2 : Premier retard de paiement (J+1)
Objectif : Notifier immédiatement le client et éviter un retard prolongé.
Actions :
Envoi automatique d’un email de relance au client.
Notification au freelance dans son espace personnel.
SMS d’alerte au client avec lien de paiement direct.
Proposition d’un contact avec un gestionnaire Freelpay en cas de difficulté.
Contenu du message :
Sujet : ⚠️ Facture [Numéro] échue – Merci de régulariser rapidement
Bonjour [Nom du client],
La facture [Numéro] d’un montant de [Montant]€ est arrivée à échéance le [Date].
Nous vous invitons à procéder au règlement dès que possible pour éviter des pénalités.
👉 Régler maintenant
Nous restons à votre disposition en cas de besoin.
Cordialement,
L’équipe Freelpay

Étape 3 : Relance amiable (J+7 et J+15)
Objectif : Insister sur la nécessité du paiement sans altérer la relation commerciale.
Actions :
Relance par téléphone et email avec rappel de la pénalité de retard potentielle.
Proposition de mise en place d’un paiement en plusieurs fois.
Dernière relance avant escalade juridique avec mention de frais supplémentaires.
Contenu du message :
Sujet : 🚨 Relance urgente – Facture [Numéro] en attente de règlement
Bonjour [Nom du client],
Nous constatons que la facture [Numéro] d’un montant de [Montant]€ reste impayée malgré nos précédentes relances.
Nous vous encourageons à régulariser la situation sous 7 jours pour éviter des frais de recouvrement.
👉 Régulariser maintenant
Merci pour votre collaboration.
Cordialement,
L’équipe Freelpay

Étape 4 : Mise en demeure (J+30)
Objectif : Informer le client qu'une procédure de recouvrement est sur le point d'être engagée.
Actions :
Envoi d'une lettre de mise en demeure officielle par email et courrier recommandé.
Blocage potentiel de nouveaux financements pour le client du freelance.
Notification au freelance de l’évolution du dossier.
Contenu du message :
Sujet : ⚖️ Mise en demeure – Facture [Numéro] en défaut de paiement
Bonjour [Nom du client],
Malgré nos rappels, la facture [Numéro] d’un montant de [Montant]€ demeure impayée.
Nous vous informons qu’à défaut de règlement sous 7 jours, nous transmettrons votre dossier à notre service de recouvrement.
👉 Régulariser maintenant
Cordialement,
L’équipe Freelpay

Étape 5 : Passage en recouvrement judiciaire (J+45 et plus)
Objectif : Enclencher des actions légales pour récupérer les fonds.
Actions :
Transmission du dossier à un cabinet de recouvrement partenaire (ex. Ruby Payeur).
Lancement d'une procédure judiciaire de recouvrement amiable ou contentieuse.
Blocage définitif des services Freelpay pour le client concerné.
Reporting au freelance avec mise à jour du statut de la facture.
Contenu du message :
Sujet : 📄 Facture en recouvrement judiciaire – Dernier avertissement
Bonjour [Nom du client],
En l'absence de règlement, la facture [Numéro] d’un montant de [Montant]€ a été transmise à notre service de recouvrement judiciaire.
Nous vous invitons à nous contacter sous 48h afin d’éviter des frais supplémentaires.
👉 Contacter notre service de recouvrement
Cordialement,
L’équipe Freelpay

Étape 6 : Suivi et reporting
Objectif : Fournir un suivi clair au freelance sur l'évolution du recouvrement.
Actions :
Mise à jour régulière du statut de la facture (Règlement partiel, Échéancier mis en place, Procédure en cours).
Rapports automatiques envoyés au freelance par email.
Option pour le freelance de demander une action spécifique via le tableau de bord.
Contenu du message :
Sujet : 📊 Suivi de votre facture en recouvrement
Bonjour [Nom du freelance],
Voici l’état actuel de votre facture [Numéro] :
Statut : [En recouvrement amiable / En recouvrement judiciaire]
Dernière action : [Rappel téléphonique effectué]
👉 Voir le détail dans votre tableau de bord
Cordialement,
L’équipe Freelpay

Résumé du flow de recouvrement
Rappel avant échéance (J-7, J-3)
Premier retard de paiement (J+1)
Relance amiable (J+7, J+15)
Mise en demeure (J+30)
Recouvrement judiciaire (J+45 et plus)
Suivi et reporting continu
CTA final pour le freelance :
"Suivez l’état de vos factures impayées en temps réel sur Freelpay."

1. Flow de la simulation
Objectif : Permettre aux freelances et aux PME de simuler un financement de facture sans inscription.
Étapes clés :
Accès à la page de simulation.
Saisie des informations de la facture (montant, échéance, client).
Analyse préliminaire via l'algorithme de scoring IA.
Affichage de la proposition de financement.
Conversion vers l'inscription pour finaliser la demande.

2. Flow de l'inscription
Objectif : Inscrire le freelance et valider son identité pour lui permettre d'accéder aux services de financement.
Étapes clés :
Accès au formulaire d'inscription (email, SIRET, téléphone, etc.).
Vérification d'identité et validation des documents (KYC).
Création du compte et accès au tableau de bord.
Notification de confirmation et invitation à déposer une facture.

3. Flow de la demande de financement
Objectif : Processus complet depuis le dépôt d’une facture jusqu'à son financement.
Étapes clés :
Connexion au compte.
Dépôt de la facture et analyse via OCR.
Vérification des informations du freelance et du client.
Questionnaire de qualification de la prestation.
Proposition de financement (montant, taux d’escompte).
Validation et signature électronique.
Déblocage des fonds et suivi du remboursement.

4. Flow du financement/facturation
Objectif : Gérer la facturation entre les différentes parties (freelance, client, Freelpay).
Étapes clés :
Création du devis dans Pennylane.
Envoi du devis au client du freelance pour signature électronique.
Génération de la facture d’achat entre Freelpay et le freelance.
Acceptation de la facture d’achat et émission de la facture de vente.
Suivi et gestion des paiements jusqu'à la clôture de la transaction.

5. Flow de recouvrement
Objectif : Assurer le suivi et le recouvrement des factures impayées.
Étapes clés :
Rappel avant échéance (J-7, J-3).
Premier retard de paiement (J+1).
Relance amiable (J+7, J+15).
Mise en demeure (J+30).
Passage en recouvrement judiciaire (J+45 et plus).
Suivi et reporting continu pour le freelance.



Liste des APIS
1. Authentification et Identité
France Connect : API France Connect
Permet l'authentification des utilisateurs en utilisant les identifiants de l'administration française.
Datakeen : API Datataken
Utilisée pour la vérification d'identité en ligne, facilitant une authentification sûre et rapide des freelances.
Onfido : API Onfido
Fournit des services de vérification d'identité avancés, y compris la biometrie faciale et le contrôle documentaire.
2. Vérification des Entreprises et SIRET
Societe.com : API Societe.com
Permet de vérifier les informations des entreprises françaises via leur SIRET.
Papers : API Papers
API pour la vérification des informations légales et financières des entreprises, permettant une analyse détaillée de la solvabilité et de la santé financière des entreprises.
3. Gestion et Vérification des Comptes Bancaires
Ficoba : API Comptes Bancaires Ficoba
Permet l'accès à des informations sur les comptes bancaires pour vérifier la validité et la propriété des comptes.
Treezor : API Treezor
API d'open banking qui permet la gestion des transactions financières, des virements, et la vérification des comptes bancaires.
Bridger
4. Gestion de Données et Stockage
API Datastore : API Datastore
Fournit des solutions pour le stockage sécurisé des données, utile pour gérer les documents fiscaux et autres informations sensibles.
5. Recouvrement de Créances
Ruby Payeur : API Ruby Payeur
Fournit des services de recouvrement de créances pour aider les freelances à récupérer les paiements en retard de manière efficace et légale.
Autres APIs utiles
Stripe API : Stripe
Pour la gestion des paiements et des transactions financières, incluant la connexion des cartes bancaires.
Plaid API : Plaid
Une alternative à Treezor pour l'intégration bancaire, offrant une connectivité étendue avec les institutions financières pour accéder aux informations financières du freelance.
Twilio API : Twilio
Pour l'envoi de notifications SMS et e-mails automatiques concernant le statut des factures et des transactions.
Google Maps API : Google Maps Platform
Pour la vérification et la normalisation des adresses postales des freelances et de leurs clients.


Annexe : Questionnaire de Qualification du Freelance
Ancienneté en tant qu'auto-entrepreneur
Question: Depuis combien de temps êtes-vous enregistré en tant qu'auto-entrepreneur ?
Type de réponse : Choix multiple (ex : Moins de 6 mois, 6 mois à 1 an, 1 à 2 ans, Plus de 2 ans)
Revenus Annuels
Question: Quel est le montant approximatif de vos revenus annuels ?
Type de réponse : Texte libre ou échelles prédéfinies (ex : Moins de 20 000€, 20 000€ à 40 000€, 40 000€ à 60 000€, Plus de 60 000€)
Fréquence de Dépôt des Factures
Question: À quelle fréquence prévoyez-vous de mettre des factures sur FreePay ?
Type de réponse : Choix multiple (ex : Chaque fois qu'une facture est émise, Mensuellement, Trimestriellement, Occasionnellement)
Régularité des Prestations
Question: Quelle est la régularité de vos prestations chez vos clients ?
Type de réponse : Choix multiple (ex : Très régulièrement avec les mêmes clients, Régulièrement avec différents clients, Irrégulièrement)
Type de Clientèle
Question : Quels types de clients servez-vous principalement ? (Entreprises, particuliers, organismes publics, etc.)
Type de réponse : Choix multiple
Secteurs d'Activité
Question : Dans quels secteurs d'activité vos clients opèrent-ils principalement ?
Type de réponse : Choix multiple (ex : Technologie, Santé, Éducation, Art et divertissement, etc.)
Impact de la Saison
Question : Votre activité est-elle affectée par la saisonnalité ?
Type de réponse : Oui/Non, suivi d'une précision si oui
Expérience Professionnelle
Question : Combien d'années d'expérience professionnelle avez-vous dans votre domaine ?
Type de réponse : Numérique (nombre d'années)
Stabilité des Revenus
Question : Vos revenus sont-ils réguliers ou fluctuent-ils fortement d'un mois à l'autre ?
Type de réponse : Choix multiple (Réguliers, Fluctuations modérées, Fortes fluctuations)
Utilisation Prévue des Avances de Trésorerie
Question : À quelles fins envisagez-vous d'utiliser les avances de trésorerie obtenues via la plateforme ?
Type de réponse : Texte libre ou choix multiple (Gestion du fonds de roulement, Investissement dans des équipements, Marketing et publicité, etc.)
Situation Financière
Question : Avez-vous actuellement des prêts ou des dettes en cours ? Si oui, veuillez préciser.
Type de réponse : Oui/Non, suivi d'une description si oui
Préférences de Communication
Question : Quel est votre moyen de communication préféré pour recevoir des notifications et des mises à jour ? (E-mail, SMS, App mobile)
Type de réponse : Choix multiple
