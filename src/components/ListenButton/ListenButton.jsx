import { useState } from "react";
import iconSpeaker from "../../assets/sound_max_fill.svg"
import { XI_API_KEY, XI_API_URL, VOICE_ID } from "../../config";
import styles from "./ListenButton.module.css";

const ListenButton = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const onListen = () => {
        if (text.length > 0) {
            setIsPlaying(true);
            const options = {
                method: 'POST',
                headers: {
                    'xi-api-key': XI_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: `{"text":"${text}","voice_settings":{"stability":0.5,"similarity_boost":0.5}}`,
            };

            fetch(`${XI_API_URL}/${VOICE_ID}`, options, { parseType: 'arrayBuffer' })
                .then(response => {
                    response && response.blob().then((audioBlob) => {
                        // Convert the binary data to a blob
                        const audioUrl = URL.createObjectURL(audioBlob);

                        // Create an audio element and set its source to the audio URL
                        const audio = new Audio(audioUrl);
                        audio.play(); // Play the audio

                        audio.addEventListener('loadedmetadata', () => {
                            // do stuff with the duration
                            const duration = (audio.duration * 1000) + 200;
                            setTimeout(() => {
                                setIsPlaying(false);
                            }, duration);
                        });
                    })
                })
                .catch(error => console.error(error));
        }
    }
    return <>
        <button type='button' className={`${styles.iconBtn} ${isPlaying ? styles.iconBtnAnimation : ''}`}>
            <img src={iconSpeaker} alt='speaker' title='Listen' onClick={onListen} />
        </button>
    </>
}

export default ListenButton;