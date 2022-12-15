import { Grid } from '@material-ui/core';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import guide_prm_appbar from '../images/guide_prm_appbar.svg';
import guide_prm_mapIndo from '../images/guide_prm_mapIndo.svg';
import guide_prm_pieSentimen from '../images/guide_prm_pieSentimen.svg';
import guide_prm_pieGender from '../images/guide_prm_pieGender.svg';
import guide_prm_sentimenPositif from '../images/guide_prm_sentimenPositif.svg';
import guide_prm_sentimenNeutral from '../images/guide_prm_sentimenNeutral.svg';
import guide_prm_sentimenNegatif from '../images/guide_prm_sentimenNegatif.svg';

export default function GuideTwitterPrmPage(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* TITLE */}
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
              marginBottom: -20,
              borderRadius: '20px',
              padding: '10px',
              marginLeft: '10px',
              marginRight: '10px',
              borderColor: '#606361',
              borderStyle: 'solid',
              borderWidth: '2px',
              // backgroundColor: '#606361',
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                color: '#606361',
              }}
            >
              GUIDE TWITTER PREMIUM
            </h1>
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      {/* Header Bar */}
      <Grid
        container
        justify='center'
        style={{ marginTop: 40, paddingLeft: 20, paddingRight: 20 }}
        spacing={3}
      >
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <div>
            {/* Header Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '20px',
                boxShadow: '0px 0px 10px #b6b6b8',
                backgroundColor: '#606361',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                <strong>Header Bar</strong>
              </h4>
            </div>
            {/* Body Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                padding: '20px',
                marginTop: -20,
                boxShadow: '0px 0px 10px #b6b6b8',
              }}
            >
              {/* APP BAR GUIDE IMAGE */}
              <Grid
                container
                justify='center'
                style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}
                spacing={3}
              >
                <Grid item sm={12}>
                  <img
                    src={guide_prm_appbar}
                    alt='guide_prm_appbar'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginTop: -20,
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
              </Grid>
              {/* Tabel Penjelasan */}
              <Grid container spacing={3}>
                {/* No 1 - 6 */}
                <Grid item sm={6}>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                  >
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Dropdown Media
                        </span>
                        Dropdown Media, untuk memilih dashboard sumber media
                        dari platform Type, berpengaruh terhadap halaman page
                        yang ada (Twitter / News).{' '}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Input Query Search
                        </span>
                        (e.g. lang:id (covid)), untuk melakukan pencarian
                        terhadap topik.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Start Date</span>/
                        Tanggal mulai untuk pencarian data, berikut dengan
                        waktunya. Eksekusi perubahan pada filter tidak dapat
                        berlangsung jika belum mengclick button search di nomer
                        "6".
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>End Date</span>/
                        Tanggal berakhir untuk pencarian data,berikut dengan
                        waktunya. Eksekusi perubahan pada filter tidak dapat
                        berlangsung jika belum mengclick button search di nomer
                        "6".
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Button reset date( X Button)
                        </span>
                        , merupakan button untuk meriset kembali tanggal yang
                        sudah kita pilih, eksekusi perubahan pada filter tidak
                        dapat berlangsung jika belum mengclick button search di
                        nomer "6".
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Button Search</span>
                        (Handler Button untuk starting search).
                      </p>
                    </li>
                  </ol>
                </Grid>
                {/* No 7 - 12 */}
                <Grid item sm={6}>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={7}
                  >
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Field Keyword</span>
                        , merupakan kumpulan keyword yang digunakan untuk
                        crawling tweet (sudah diinput ketika melakukan setting
                        properties di NiFi ) sesuai dengan masing-masing topik
                        sehingga field ini dipengaruhi button Dropdown Topik.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Historical Search
                        </span>
                        , dropdown untuk bisa memilih query atau topik yang
                        sudah pernah masuk daftar pencarian sebelumnya.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Button delete historical search
                        </span>
                        , untuk menghapus historical search dari topik yang
                        sudah pernah masuk daftar pencarian sebelumnya, namun
                        harus memilih historical date terlebih dahulu agar dapat
                        menghapus historical search.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Togle Button</span>,
                        untuk switch ke mode Twitter Standard.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Logout Button</span>
                        , untuk melakukan logout user.
                      </p>
                    </li>
                  </ol>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      {/* LINE 1 / Tweet Activity - Word Cloud  NEW */}
      <Grid
        container
        justify='center'
        style={{ paddingLeft: 20, paddingRight: 20 }}
        spacing={3}
      >
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <div>
            {/* Header Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '20px',
                boxShadow: '0px 0px 10px #b6b6b8',
                backgroundColor: '#606361',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                <strong>LINE 1</strong>
              </h4>
            </div>
            {/* Body Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                padding: '20px',
                marginTop: -20,
                boxShadow: '0px 0px 10px #b6b6b8',
              }}
            >
              {/* Map word cloud and summary IMAGE */}
              <Grid
                container
                justify='center'
                style={{
                  padding: 20,
                }}
                spacing={1}
              >
                <Grid item sm={12}>
                  <img
                    src={guide_prm_mapIndo}
                    alt='guide_prm_mapIndo'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
              </Grid>
              {/* Tabel Penjelasan */}
              {/* Map & word cloud */}
              <p
                style={{
                  textAlign: 'justify',
                  padding: '10px',
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  color: '#606361',
                  fontSize: '14px',
                }}
              >
                <span style={{ fontWeight: '900' }}>
                  Widget Tweet Activity & Word Cloud
                </span>
                , Gabungan antara Peta tata daerah tweet, WordCloud, dan
                Barchart WordCloud yang di bungkus menjadi satu container.
                Widget dipengaruhi oleh filter yang ada di dalam container
                tersebut yaitu dropdown (Semua Tweet) dan dropdown (keyword &gt;
                5).
              </p>
              <Grid container spacing={3}>
                {/* left paragraf */}
                <Grid item sm={6}>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={12}
                  >
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Legend Widget</span>
                        / Keterangan merupakan kategori warna yang menjelaskan
                        seberapa ramai tweet yang ada, kategori Undefined
                        berlaku untuk tweet yang tidak diketahui berasal dari
                        regional mana.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Word Cloud</span>,
                        menampilkan kata-kata yang sering dibicarakan pada
                        tweet.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Keyword Bar</span>,
                        menampilkan keterangan jumah bila di hover.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          {' '}
                          Field total tweet
                        </span>
                        , Informasi dari jumlah Tweet, yang dipengaruhi oleh
                        semua filter yang ada pada Header Bar.
                      </p>
                    </li>
                  </ol>
                </Grid>
                {/* right paragraf */}
                <Grid item sm={6}>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={16}
                  >
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Dropdown Sentiment
                        </span>
                        , filter untuk mengubah sentiment yang hanya berpengaruh
                        terhadap container Tweet Activity & Word Cloud.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Dropdown Jumlah Keyword
                        </span>
                        , filter untuk mengatur jumlah kata kunci (keyword) yang
                        ingin di tampilkan. filter tersebut hanya berpengaruh
                        terhadap container Tweet Activity & Word Cloud.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Historical Date
                        </span>
                        , kita bisa memilih historical Start Date dan End Date
                        yg sudah pernah kita search sebelumnya, filter ini
                        mempengaruhi range waktu pada keseluruhan widget yang
                        berada pada dashboard.
                      </p>
                    </li>
                  </ol>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      {/* LINE 2 / Pie Gender, Pie Sentimen NEW */}
      <Grid
        container
        justify='center'
        style={{ paddingLeft: 20, paddingRight: 20 }}
        spacing={3}
      >
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <div>
            {/* Header Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '20px',
                boxShadow: '0px 0px 10px #b6b6b8',
                backgroundColor: '#606361',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                <strong>LINE 2</strong>
              </h4>
            </div>
            {/* Body Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                padding: '20px',
                marginTop: -20,
                boxShadow: '0px 0px 10px #b6b6b8',
              }}
            >
              {/* Pie Diagram and Tweet overtime IMAGE */}
              <Grid
                container
                direction='row'
                spacing={2}
                justify='center'
                style={{ paddingLeft: 48, paddingRight: 48 }}
              >
                <Grid item xs>
                  <img
                    src={guide_prm_pieSentimen}
                    alt='guide_prm_pieSentimen'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <img
                    src={guide_prm_pieGender}
                    alt='guide_prm_pieGender'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
              </Grid>
              {/* Tabel Penjelasan */}
              <Grid
                container
                direction='row'
                spacing={2}
                justify='center'
                style={{ paddingLeft: 20, paddingRight: 20 }}
              >
                {/* Pie Sentimen */}
                <Grid item xs>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={23}
                  >
                    <p
                      style={{
                        textAlign: 'justify',
                      }}
                    >
                      <span style={{ fontWeight: '900' }}>
                        Widget Pie Sentimen
                      </span>
                      , Pie chart akumulasi total sentiment dari keseluruhan
                      tweet, widget berikut dipengaruhi oleh seluruh filter yang
                      ada pada header bar.
                    </p>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Legend Pie Sentimen Diagram
                        </span>
                        , menampilkan keterangan Sentimen dalam persentase.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Diagram Pie Sentimen
                        </span>
                        , menampilkan keterangan Sentimen dalam satuan jumlah.
                      </p>
                    </li>
                  </ol>
                </Grid>
                {/* Pie gender */}
                <Grid item xs>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={25}
                  >
                    <p
                      style={{
                        textAlign: 'justify',
                      }}
                    >
                      <span style={{ fontWeight: '900' }}>
                        Widget Pie Gender
                      </span>
                      , Pie chart akumulasi total Gender dari keseluruhan tweet,
                      widget berikut dipengaruhi oleh seluruh filter yang ada
                      pada header bar.
                    </p>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Legend Pie Gender Diagram
                        </span>
                        , menampilkan keterangan jenis gender dalam persentase.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>
                          Diagram Pie Gender
                        </span>
                        , menampilkan keterangan Gender dalam satuan jumlah.
                      </p>
                    </li>
                  </ol>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      {/* LINE 3 / Sentimen Table NEW */}
      <Grid
        container
        justify='center'
        style={{ paddingLeft: 20, paddingRight: 20 }}
        spacing={3}
      >
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <div>
            {/* Header Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '20px',
                boxShadow: '0px 0px 10px #b6b6b8',
                backgroundColor: '#606361',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                <strong>LINE 3</strong>
              </h4>
            </div>
            {/* Body Table */}
            <div
              style={{
                marginLeft: '10px',
                margin: 20,
                fontFamily: 'Poppins',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #b6b6b8',
                borderWidth: '2px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                padding: '20px',
                marginTop: -20,
                boxShadow: '0px 0px 10px #b6b6b8',
              }}
            >
              {/* Sentimen Table IMAGE */}
              <Grid
                container
                direction='row'
                spacing={2}
                justify='center'
                style={{ paddingLeft: 20, paddingRight: 20 }}
              >
                <Grid item xs>
                  <img
                    src={guide_prm_sentimenPositif}
                    alt='guide_prm_sentimenPositif'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <img
                    src={guide_prm_sentimenNeutral}
                    alt='guide_prm_sentimenNeutral'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <img
                    src={guide_prm_sentimenNegatif}
                    alt='guide_prm_sentimenNegatif'
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
              </Grid>
              {/* Tabel Penjelasan */}
              <Grid
                container
                direction='row'
                spacing={2}
                justify='center'
                style={{ paddingLeft: 20, paddingRight: 20 }}
              >
                {/* Table sentimen positif */}
                <Grid item xs>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={27}
                  >
                    <p
                      style={{
                        textAlign: 'justify',
                      }}
                    >
                      <span style={{ fontWeight: '900' }}>
                        Widget Table Positive
                      </span>
                      , merupakan table kumpulan tweet positive, pada setiap
                      column list dapat di click dan langsung membuka user
                      profile pada halaman baru dari username yang dipilih.
                      Widget table positive ini dipengaruhi oleh seluruh filter
                      yang ada pada dashboard.
                    </p>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Username</span>,
                        adalah nama user dari akun twitter yang memiliki
                        sentimen positive.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Tweet</span>, adalah
                        postingan tweet dari akun twitter tersebut yang di post
                        dan memiliki sentimen positive.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Location</span>,
                        adalah lokasi berdasarkan regional dari profile akun
                        twitter yang memiliki sentimen positive, jika berisi
                        “undefined” berarti lokasi tidak dicantumkan oleh user
                        twitter.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Attraction</span>,
                        adalah jumlah Attraction dari akun twitter yang memiliki
                        sentimen positive berdasarkan tweet yang di post.
                      </p>
                    </li>
                  </ol>
                </Grid>
                {/* Table sentimen netral */}
                <Grid item xs>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={31}
                  >
                    <p
                      style={{
                        textAlign: 'justify',
                      }}
                    >
                      <span style={{ fontWeight: '900' }}>
                        Widget Table Neutral
                      </span>
                      , merupakan table kumpulan tweet neutral, pada setiap
                      column list dapat di click dan langsung membuka user
                      profile pada halaman baru dari username yang dipilih.
                      Widget table neutral ini dipengaruhi oleh seluruh filter
                      yang ada pada dashboard.
                    </p>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Username</span>,
                        adalah nama user dari akun twitter yang memiliki
                        sentimen neutral.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Tweet</span>, adalah
                        postingan tweet dari akun twitter tersebut yang di post
                        dan memiliki sentimen neutral.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Location</span>,
                        adalah lokasi berdasarkan regional dari profile akun
                        twitter yang memiliki sentimen neutral, jika berisi
                        “undefined” berarti lokasi tidak dicantumkan oleh user
                        twitter.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Attraction</span>,
                        adalah jumlah Attraction dari akun twitter yang memiliki
                        sentimen neutral berdasarkan tweet yang di post.
                      </p>
                    </li>
                  </ol>
                </Grid>
                {/* Table sentimen negatif */}
                <Grid item xs>
                  <ol
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      color: '#606361',
                      fontSize: '14px',
                    }}
                    start={35}
                  >
                    <p
                      style={{
                        textAlign: 'justify',
                      }}
                    >
                      <span style={{ fontWeight: '900' }}>
                        Widget Table Negative
                      </span>
                      , merupakan table kumpulan tweet negative, pada setiap
                      column list dapat di click dan langsung membuka user
                      profile pada halaman baru dari username yang dipilih.
                      Widget table negative ini dipengaruhi oleh seluruh filter
                      yang ada pada dashboard.
                    </p>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Username</span>,
                        adalah nama user dari akun twitter yang memiliki
                        sentimen negative.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Tweet</span>, adalah
                        postingan tweet dari akun twitter tersebut yang di post
                        dan memiliki sentimen negative.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Location</span>,
                        adalah lokasi berdasarkan regional dari profile akun
                        twitter yang memiliki sentimen negative, jika berisi
                        “undefined” berarti lokasi tidak dicantumkan oleh user
                        twitter.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span style={{ fontWeight: '900' }}>Attraction</span>,
                        adalah jumlah Attraction dari akun twitter yang memiliki
                        sentimen negative berdasarkan tweet yang di post.
                      </p>
                    </li>
                  </ol>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
    </React.Fragment>
  );
}
